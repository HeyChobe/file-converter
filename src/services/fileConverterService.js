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
      const blob = await response.blob();
      const downloadLink = URL.createObjectURL(blob);
      return { status: true, url: downloadLink, extension: "data.json" };
    } catch (error) {
      return { status: false, url: "", extension: "" };
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
      const blob = await response.blob();
      const downloadLink = URL.createObjectURL(blob);
      return { status: true, url: downloadLink, extension: "data.xml" };
    } catch (error) {
      return { status: false, url: "", extension: "" };
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
      const blob = await response.blob();
      const downloadLink = URL.createObjectURL(blob);
      return { status: true, url: downloadLink, extension: "data.txt" };
    } catch (error) {
      return { status: false, url: "", extension: "" };
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
      const blob = await response.blob();
      const downloadLink = URL.createObjectURL(blob);
      return { status: true, url: downloadLink, extension: "data.txt" };
    } catch (error) {
      return { status: false, url: "", extension: "" };
    }
  },
};

export default fileConverterService;
