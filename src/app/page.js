"use client";

import { useFileConverter } from "@/hooks/useFileConverter";
import { useState } from "react";

export default function Home() {
  const {
    result,
    convertXmlToTxt,
    convertTxtToJson,
    convertJsonToTxt,
    convertTxtToXml,
  } = useFileConverter();

  const onChangeFile = async (file) => {
    const status = await convertXmlToTxt(file);
    if (!status) alert("error");
  };

  return (
    <main>
      <label htmlFor="file">Select a file to convert:</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".txt, .json, .xml"
        onChange={(e) => onChangeFile(e.target.files[0])}
      />
      {result.url !== "" ? (
        <a href={result.url} download={result.extension}>
          download
        </a>
      ) : null}
    </main>
  );
}
