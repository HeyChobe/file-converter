import { TRANSLATE_TYPE } from "./constants";

export const obtainDataFromTXT = (file, onlyStringRequired = false) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      if (onlyStringRequired) return resolve(content);
      const clients = content.split(/\r?\n/);
      resolve(clients);
    };

    reader.onerror = (e) => {
      reject(e.target.error);
    };

    reader.readAsText(file);
  });
};

export const obtainDataFromXML = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const xmlContent = e.target.result;
      resolve(xmlContent);
    };

    reader.onerror = (e) => {
      reject(e.target.error);
    };

    reader.readAsText(file);
  });
};

export const obtainDataFromJSON = (file, onlyStringRequired = false) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      if (onlyStringRequired) return resolve(content);
      const jsonContent = JSON.parse(content);
      resolve(jsonContent);
    };

    reader.onerror = (e) => {
      reject(e.target.error);
    };

    reader.readAsText(file);
  });
};

export const obtainBlob = (id, content) => {
  switch (id) {
    case TRANSLATE_TYPE.TXT:
      return new Blob([content], { type: "text/plain" });
    case TRANSLATE_TYPE.XML:
      return new Blob([content], { type: "text/xml" });
    case TRANSLATE_TYPE.JSON:
      return new Blob([content], { type: "application/json" });
    default:
      return null;
  }
};
