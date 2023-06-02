import { TRANSLATE_TYPE } from "./constants";

const obtainClientsFromTXT = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const clients = content.split(/\r?\n/);
      resolve(clients);
    };

    reader.onerror = (e) => {
      reject(e.target.error);
    };

    reader.readAsText(file);
  });
};

const obtainClientsFromXML = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const xmlContent = e.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
      resolve(xmlDoc);
    };

    reader.onerror = (e) => {
      reject(e.target.error);
    };

    reader.readAsText(file);
  });
};

const obtainClientsFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const jsonContent = JSON.parse(content);
      resolve(jsonContent);
    };

    reader.onerror = (e) => {
      reject(e.target.error);
    };

    reader.readAsText(file);
  });
};

const obtainUrl = (id, content) => {
  let blob = null;
  switch (id) {
    case TRANSLATE_TYPE.TXT:
      blob = new Blob([content], { type: "text/plain" });
      return URL.createObjectURL(blob);
    case TRANSLATE_TYPE.XML:
      blob = new Blob([content], { type: "text/xml" });
      return URL.createObjectURL(blob);
    case TRANSLATE_TYPE.JSON:
      blob = new Blob([content], { type: "application/json" });
      return URL.createObjectURL(blob);
    default:
      return null;
  }
};

export const txtToXml = async (file) => {
  try {
    const clients = await obtainClientsFromTXT(file);
    const xmlData = `
   <clientes>
      ${clients
        .map((client) => {
          const [id, names, lastnames, cardId, type, telephone, polygon] =
            client.split(";");
          return `<cliente>
        <documento>${id}</documento>
        <nombres>${names}</nombres>
        <apellidos>${lastnames}</apellidos>
        <tarjeta>${cardId}</tarjeta>
        <tipo>${type}</tipo>
        <telefono>${telephone}</telefono>
        <poligono>POLYGON ${polygon}</poligono>
        </cliente>`;
        })
        .join("")}
    </clientes>
  `;
    const url = obtainUrl(TRANSLATE_TYPE.XML, xmlData);
    return { status: true, url, extension: "data.xml" };
  } catch (error) {
    return { status: false, url: "", extension: "" };
  }
};

export const txtToJson = async (file) => {
  try {
    const clients = await obtainClientsFromTXT(file);
    const dataToJson = clients.map((client) => {
      const [id, names, lastnames, cardId, type, telephone, polygon] =
        client.split(";");

      const coordinates = polygon
        .slice(2, -2)
        .split("),(")
        .map((group) =>
          group.split(",").map((coordinate) => coordinate.trim().split(" "))
        );

      return {
        documento: id,
        nombres: names,
        apellidos: lastnames,
        tarjeta: cardId,
        tipo: type,
        telefono: telephone,
        poligono: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "polygon",
                coordinates,
              },
              properties: {
                Land_Use: "I",
              },
            },
          ],
        },
      };
    });

    const jsonData = JSON.stringify(dataToJson);
    const url = obtainUrl(TRANSLATE_TYPE.JSON, jsonData);
    return { status: true, url, extension: "data.json" };
  } catch (error) {
    return { status: false, url: "", extension: "" };
  }
};

export const xmlToTxt = async (file) => {
  try {
    const xmlDoc = await obtainClientsFromXML(file);

    const clients = xmlDoc.getElementsByTagName("cliente");

    const txtData = Array.from(clients)
      .map((client) => {
        const id = client.getElementsByTagName("documento")[0].textContent;
        const names = client.getElementsByTagName("nombres")[0].textContent;
        const lastnames =
          client.getElementsByTagName("apellidos")[0].textContent;
        const cardId = client.getElementsByTagName("tarjeta")[0].textContent;
        const type = client.getElementsByTagName("tipo")[0].textContent;
        const telephone =
          client.getElementsByTagName("telefono")[0].textContent;
        const polygon = client
          .getElementsByTagName("poligono")[0]
          .textContent.replace("POLYGON ", "");

        return `${id};${names};${lastnames};${cardId};${type};${telephone};${polygon};`;
      })
      .join("\n");

    const url = obtainUrl(TRANSLATE_TYPE.TXT, txtData);
    return { status: true, url, extension: "data.txt" };
  } catch (error) {
    return { status: false, url: "", extension: "" };
  }
};

export const jsonToTxt = async (file) => {
  try {
    const clients = await obtainClientsFromJSON(file);

    const txtData = clients
      .map((client) => {
        const {
          documento,
          nombres,
          apellidos,
          tarjeta,
          telefono,
          tipo,
          poligono,
        } = client;

        const coordinates = poligono.features[0].geometry.coordinates;

        const polygons = `(${coordinates.map(
          (polygon) => `(${polygon.map((linearRing) => linearRing.join(" "))})`
        )})`;

        return `${documento};${nombres};${apellidos};${tarjeta};${tipo};${telefono};${polygons};`;
      })
      .join("\n");

    const url = obtainUrl(TRANSLATE_TYPE.TXT, txtData);
    return { status: true, url, extension: "data.txt" };
  } catch (error) {
    return { status: true, url: "", extension: "" };
  }
};
