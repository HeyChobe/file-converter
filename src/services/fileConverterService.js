import {
  obtainDataFromJSON,
  obtainDataFromTXT,
  obtainDataFromXML,
} from "@/util/obtainContentUtils";

const fileConverterService = {
  txtToJson: async (file) => {
    try {
      const content = await obtainDataFromTXT(file);
      const response = await fetch("/api/convert/txt-to-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
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
  txtToXml: async (file) => {
    try {
      const content = await obtainDataFromTXT(file);
      const response = await fetch("/api/convert/txt-to-xml", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
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
  jsonToTxt: async (file) => {
    try {
      const content = await obtainDataFromJSON(file);
      const response = await fetch("/api/convert/json-to-txt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
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
  xmlToTxt: async (file) => {
    try {
      const content = await obtainDataFromXML(file);
      const response = await fetch("/api/convert/xml-to-txt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
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
