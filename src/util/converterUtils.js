import { DOMParser } from "xmldom";
import { TRANSLATE_TYPE } from "./constants";
import { obtainBlob } from "./obtainContentUtils";

export const txtToXml = (content) => {
  const xmlData = `
   <clientes>
    ${content
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
  return obtainBlob(TRANSLATE_TYPE.XML, xmlData);
};

export const txtToJson = (content) => {
  const dataToJson = content.map((client) => {
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
  return obtainBlob(TRANSLATE_TYPE.JSON, jsonData);
};

export const xmlToTxt = (xmlContent) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
  const content = xmlDoc.getElementsByTagName("cliente");

  const txtData = Array.from(content)
    .map((client) => {
      const id = client.getElementsByTagName("documento")[0].textContent;
      const names = client.getElementsByTagName("nombres")[0].textContent;
      const lastnames = client.getElementsByTagName("apellidos")[0].textContent;
      const cardId = client.getElementsByTagName("tarjeta")[0].textContent;
      const type = client.getElementsByTagName("tipo")[0].textContent;
      const telephone = client.getElementsByTagName("telefono")[0].textContent;
      const polygon = client
        .getElementsByTagName("poligono")[0]
        .textContent.replace("POLYGON ", "");

      return `${id};${names};${lastnames};${cardId};${type};${telephone};${polygon};`;
    })
    .join("\n");

  return obtainBlob(TRANSLATE_TYPE.TXT, txtData);
};

export const jsonToTxt = (content) => {
  const txtData = content
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

  return obtainBlob(TRANSLATE_TYPE.TXT, txtData);
};
