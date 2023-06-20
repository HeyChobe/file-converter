const idExpected = /^\d{8}-\d{1}/;
const telExpected = /\d{8}/;
const polygonTxtExpected =
  /\(\(-?\d+(\.\d+)? -?\d+(\.\d+)?(, -?\d+(\.\d+)? -?\d+(\.\d+)?)*\)\)$/;
// const polygonJsonExpected =
//   /\[\[\[\s*("-?\d+(\.\d+)?")\s*,\s*("-?\d+(\.\d+)?")(\s*,\s*"-?\d+(\.\d+)?",\s*"-?\d+(\.\d+)?")*\s*\]\](,\s*)?]+\]/;
const polygonJsonExpected =
  /^\[\s*(\[\s*\[\s*"-?\d+(\.\d+)?",\s*"-?\d+(\.\d+)?"\s*\](,\s*\[\s*"-?\d+(\.\d+)?",\s*"-?\d+(\.\d+)?"\s*\])*\s*\])+\s*\]$/;

export const validateTxt = (content, delimiter) => {
  content.forEach((client) => {
    const [id, names, lastnames, cardId, type, tel, polygon] =
      client.split(delimiter);

    if (!id)
      throw new Error(`No se ha proporcionado un documento en ${client}`);
    if (!names)
      throw new Error(`No se han proporcionado los nombres en ${client}`);
    if (!lastnames)
      throw new Error(`No se han proporcionado los apellidos en ${client}`);
    if (!cardId)
      throw new Error(`No se ha proporcionado una tarjeta en ${client}`);
    if (!type) throw new Error(`No se ha proporcionado un tipo en ${client}`);
    if (!tel)
      throw new Error(`No se ha proporcionado un documento en ${client}`);
    if (!polygon)
      throw new Error(`No se ha proporcionado un poligono en ${client}`);
    if (!idExpected.test(id))
      throw new Error(`El documento debe ser XXXXXXXX-X en ${client}`);
    if (!telExpected.test(tel))
      throw new Error(`El telefono debe tener 8 digitos en ${client}`);
    if (!polygonTxtExpected.test(polygon))
      throw new Error(
        `El poligono debe ser en formato ((XX.XX XX.XX, XX.XX XX.XX, ...)) en ${client}`
      );
  });
};

export const validateJson = (content) => {
  content.forEach((client) => {
    const {
      documento: id,
      nombres: names,
      apellidos: lastnames,
      tarjeta: cardId,
      tipo: type,
      telefono: tel,
      poligono: polygon,
    } = client;
    if (!id)
      throw new Error(
        `No se ha proporcionado un documento en ${JSON.stringify(client)}`
      );
    if (!names)
      throw new Error(
        `No se han proporcionado los nombres en ${JSON.stringify(client)}`
      );
    if (!lastnames)
      throw new Error(
        `No se han proporcionado los apellidos en ${JSON.stringify(client)}`
      );
    if (!cardId)
      throw new Error(
        `No se ha proporcionado una tarjeta en ${JSON.stringify(client)}`
      );
    if (!type)
      throw new Error(
        `No se ha proporcionado un tipo en ${JSON.stringify(client)}`
      );
    if (!tel)
      throw new Error(
        `No se ha proporcionado un documento en ${JSON.stringify(client)}`
      );
    if (Object.keys(polygon).length === 0)
      throw new Error(
        `No se ha proporcionado un poligono en ${JSON.stringify(client)}`
      );
    if (!idExpected.test(id))
      throw new Error(
        `El documento debe ser XXXXXXXX-X en ${JSON.stringify(client)}`
      );
    if (!telExpected.test(tel))
      throw new Error(
        `El telefono debe tener 8 digitos en ${JSON.stringify(client)}`
      );
    if (
      !polygonJsonExpected.test(
        JSON.stringify(polygon.features[0].geometry.coordinates)
      )
    )
      throw new Error(
        `El poligono debe ser en el formato [[[XX.XX,XX.XX],[XX.XX,XX.XX],...]] en ${JSON.stringify(
          client
        )}`
      );
  });
};

export const validateXml = (content) => {};
