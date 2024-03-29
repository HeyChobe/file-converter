import { useState } from "react";
import fileConverterService from "@/services/fileConverterService";
import {
  obtainDataFromJSON,
  obtainDataFromTXT,
  obtainDataFromXML,
} from "@/util/obtainContentUtils";

export const useFileConverter = () => {
  const [result, setResult] = useState({
    status: false,
    url: "",
    extension: "",
    message: "",
  });
  const [originContent, setOriginContent] = useState("");
  const [convertedContent, setConvertedContent] = useState("");

  const obtainContent = async (file) => {
    let content = "";

    switch (file.type) {
      case "text/plain":
        content = await obtainDataFromTXT(file, true);
        break;
      case "text/xml":
        content = await obtainDataFromXML(file);
        break;
      case "application/json":
        content = await obtainDataFromJSON(file, true);
        break;
      default:
        break;
    }

    setOriginContent(content);
  };

  const convertTxtToXml = async (file, delimiter, key) => {
    const response = await fileConverterService.txtToXml(file, delimiter, key);
    setDataState(response);
    return response;
  };

  const convertTxtToJson = async (file, delimiter, key) => {
    const response = await fileConverterService.txtToJson(file, delimiter, key);
    setDataState(response);
    return response;
  };

  const convertXmlToTxt = async (file, delimiter, key) => {
    const response = await fileConverterService.xmlToTxt(file, delimiter, key);
    setDataState(response);
    return response;
  };

  const convertJsonToTxt = async (file, delimiter, key) => {
    const response = await fileConverterService.jsonToTxt(file, delimiter, key);
    setDataState(response);
    return response;
  };

  const setDataState = (response) => {
    const { convertedContent, ...updatedResult } = response;
    setResult(updatedResult);
    setConvertedContent(convertedContent);
  };

  return {
    result,
    originContent,
    convertedContent,
    setConvertedContent,
    convertTxtToXml,
    convertJsonToTxt,
    convertTxtToJson,
    convertXmlToTxt,
    obtainContent,
  };
};
