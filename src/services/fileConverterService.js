import { createToken, encrypt, encryptCards } from "@/util/cryptoUtils";
import {
  obtainDataFromJSON,
  obtainDataFromTXT,
  obtainDataFromXML,
} from "@/util/obtainContentUtils";

const fileConverterService = {
  txtToJson: async (file, delimiter, key) => {
    try {
      const content = await obtainDataFromTXT(file);
      const encryptedContent = encryptCards(content, key, delimiter);
      const token = createToken({ encryptedContent, delimiter });
      const response = await fetch("/api/convert/txt-to-json", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJson = await response.json();

      const blobData = Buffer.from(responseJson.blob, "base64");
      const blob = new Blob([blobData], { type: "application/json" });
      const downloadLink = URL.createObjectURL(blob);

      return {
        status: true,
        url: downloadLink,
        extension: "data.json",
        convertedContent: responseJson.convertedContent,
      };
    } catch (error) {
      return { status: false, url: "", extension: "", convertedContent: "" };
    }
  },
  txtToXml: async (file, delimiter, key) => {
    try {
      const content = await obtainDataFromTXT(file);
      const encryptedContent = encryptCards(content, key, delimiter);
      const token = createToken({ encryptedContent, delimiter });
      const response = await fetch("/api/convert/txt-to-xml", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJson = await response.json();

      const blobData = Buffer.from(responseJson.blob, "base64");
      const blob = new Blob([blobData], { type: "application/xml" });
      const downloadLink = URL.createObjectURL(blob);

      return {
        status: true,
        url: downloadLink,
        extension: "data.xml",
        convertedContent: responseJson.convertedContent,
      };
    } catch (error) {
      return { status: false, url: "", extension: "", convertedContent: "" };
    }
  },
  jsonToTxt: async (file, delimiter, key) => {
    try {
      const content = await obtainDataFromJSON(file);
      const encryptedKey = encrypt(key, process.env.NEXT_PUBLIC_PRIVATE_KEY);
      const token = createToken({ content, encryptedKey, delimiter });
      const response = await fetch("/api/convert/json-to-txt", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJson = await response.json();

      const blobData = Buffer.from(responseJson.blob, "base64");
      const blob = new Blob([blobData], { type: "text/plain" });
      const downloadLink = URL.createObjectURL(blob);

      return {
        status: true,
        url: downloadLink,
        extension: "data.txt",
        convertedContent: responseJson.convertedContent,
      };
    } catch (error) {
      return { status: false, url: "", extension: "", convertedContent: "" };
    }
  },
  xmlToTxt: async (file, delimiter, key) => {
    try {
      const content = await obtainDataFromXML(file);
      const encryptedKey = encrypt(key, process.env.NEXT_PUBLIC_PRIVATE_KEY);
      const token = createToken({ content, encryptedKey, delimiter });
      const response = await fetch("/api/convert/xml-to-txt", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseJson = await response.json();

      const blobData = Buffer.from(responseJson.blob, "base64");
      const blob = new Blob([blobData], { type: "text/plain" });
      const downloadLink = URL.createObjectURL(blob);

      return {
        status: true,
        url: downloadLink,
        extension: "data.txt",
        convertedContent: responseJson.convertedContent,
      };
    } catch (error) {
      return { status: false, url: "", extension: "", convertedContent: "" };
    }
  },
};

export default fileConverterService;
