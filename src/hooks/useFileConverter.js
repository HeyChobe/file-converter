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

  const convertTxtToXml = async (file) => {
    const response = await fileConverterService.txtToXml(file);
    setDataState(response);
    return response.status;
  };

  const convertTxtToJson = async (file) => {
    const response = await fileConverterService.txtToJson(file);
    setDataState(response);
    return response.status;
  };

  const convertXmlToTxt = async (file) => {
    const response = await fileConverterService.xmlToTxt(file);
    setDataState(response);
    return response.status;
  };

  const convertJsonToTxt = async (file) => {
    const response = await fileConverterService.jsonToTxt(file);
    setDataState(response);
    return response.status;
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
    convertTxtToXml,
    convertJsonToTxt,
    convertTxtToJson,
    convertXmlToTxt,
    obtainContent,
  };
};
