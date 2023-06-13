import { useState } from "react";
import fileConverterService from "@/services/fileConverterService";

export const useFileConverter = () => {
  const [result, setResult] = useState({
    status: false,
    url: "",
    extension: "",
  });

  const convertTxtToXml = async (file) => {
    const response = await fileConverterService.txtToXml(file);
    setResult(response);
    return response.status;
  };

  const convertTxtToJson = async (file) => {
    const response = await fileConverterService.txtToJson(file);
    setResult(response);
    return response.status;
  };

  const convertXmlToTxt = async (file) => {
    const response = await fileConverterService.xmlToTxt(file);
    setResult(response);
    return response.status;
  };

  const convertJsonToTxt = async (file) => {
    const response = await fileConverterService.jsonToTxt(file);
    setResult(response);
    return response.status;
  };

  return {
    result,
    convertTxtToXml,
    convertJsonToTxt,
    convertTxtToJson,
    convertXmlToTxt,
  };
};
