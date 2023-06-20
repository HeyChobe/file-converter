import { DOMParser } from "xmldom";
import { TRANSLATE_TYPE } from "./constants";
import { obtainBlob } from "./obtainContentUtils";
import { decrypt } from "./cryptoUtils";

export const txtToXml = (content, delimiter) => {
  const xmlData = `
   <clientes>
    ${content
      .map((client) => {
        const [id, names, lastnames, cardId, type, telephone, polygon] =
          client.split(delimiter);
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
  return {
    blob: obtainBlob(TRANSLATE_TYPE.XML, xmlData),
    convertedContent: xmlData,
  };
};

export const txtToJson = (content, delimiter) => {
  const dataToJson = content.map((client) => {
    const [id, names, lastnames, cardId, type, telephone, polygon] =
      client.split(delimiter);

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
  return {
    blob: obtainBlob(TRANSLATE_TYPE.JSON, jsonData),
    convertedContent: jsonData,
  };
};

export const xmlToTxt = (xmlContent, delimiter, key) => {
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

      return `${id};${names};${lastnames};${decrypt(
        cardId,
        key
      )};${type};${telephone};${polygon};`;
    })
    .join("\n")
    .replaceAll(";", delimiter);

  return {
    blob: obtainBlob(TRANSLATE_TYPE.TXT, txtData),
    convertedContent: txtData,
  };
};

export const jsonToTxt = (content, delimiter, key) => {
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

      return `${documento};${nombres};${apellidos};${decrypt(
        tarjeta,
        key
      )};${tipo};${telefono};${polygons};`;
    })
    .join("\n")
    .replaceAll(";", delimiter);
  return {
    blob: obtainBlob(TRANSLATE_TYPE.TXT, txtData),
    convertedContent: txtData,
  };
};
