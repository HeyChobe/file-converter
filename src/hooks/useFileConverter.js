import { useState } from "react";
import { txtToXml, txtToJson, xmlToTxt, jsonToTxt } from "../util/fileUtils";

export const useFileConverter = () => {
  const [result, setResult] = useState({
    status: false,
    url: "",
    extension: "",
  });

  const convertTxtToXml = async (file) => {
    const response = await txtToXml(file);
    setResult(response);
    return response.status;
  };

  const convertTxtToJson = async (file) => {
    const response = await txtToJson(file);
    setResult(response);
    return response.status;
  };

  const convertXmlToTxt = async (file) => {
    const response = await xmlToTxt(file);
    setResult(response);
    return response.status;
  };

  const convertJsonToTxt = async (file) => {
    const response = await jsonToTxt(file);
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
