"use client";

import "./global.css";
import uploadIcon from "./upload-icon.svg";
import txtIcon from "./txt-icon.svg";
import jsonIcon from "./json-icon.svg";
import xmlIcon from "./xml-icon.svg";
import styles from "./page.module.css";
import Image from "next/image";
import { useFileConverter } from "@/hooks/useFileConverter";
import { useState } from "react";
import { TRANSLATE_TYPE } from "@/util/constants";

class TypeFile {
  id;
  name;

  constructor(idP, nameP) {
    this.id = idP;
    this.name = nameP;
  }
}
const txtType = new TypeFile(0, "TXT");
const jsonType = new TypeFile(1, "JSON");
const xmlType = new TypeFile(2, "XML");

export default function Home() {
  const {
    result,
    originContent,
    convertedContent,
    obtainContent,
    convertXmlToTxt,
    convertTxtToJson,
    convertJsonToTxt,
    convertTxtToXml,
  } = useFileConverter();

  const [inputFile, setInputFile] = useState(null);
  const [inputFileName, setInputFileName] = useState("Subir archivo");
  const [inputTypeIcon, setInputTypeIcon] = useState(uploadIcon);
  const [typeFiles, setTypeFiles] = useState([txtType, jsonType, xmlType]);
  const [delimiter, setDelimiter] = useState(";");
  const [secret, setSecret] = useState("");
  const [selectedType, setSelectedType] = useState(-1);

  const callConverter = async () => {
    let response = {};

    if (delimiter === "" || secret === "")
      return alert("Debes colocar un delimitador y una llave secreta");

    switch (selectedType) {
      case TRANSLATE_TYPE.TXT:
        response =
          inputFile.type === "application/json"
            ? await convertJsonToTxt(inputFile, delimiter, secret)
            : await convertXmlToTxt(inputFile, delimiter, secret);
        break;
      case TRANSLATE_TYPE.JSON:
        response = await convertTxtToJson(inputFile, delimiter, secret);
        break;
      case TRANSLATE_TYPE.XML:
        response = await convertTxtToXml(inputFile, delimiter, secret);
        break;
      default:
        return alert("Debes seleccionar un tipo de archivo");
    }
    alert(response.message);
  };

  const onChangeFile = async (file) => {
    if (!file) {
      alert("error");
      return;
    }

    switch (file.type) {
      case "text/plain":
        setInputTypeIcon(txtIcon);
        setTypeFiles([jsonType, xmlType]);
        break;
      case "text/xml":
        setInputTypeIcon(xmlIcon);
        setTypeFiles([txtType, jsonType]);
        break;
      case "application/json":
        setInputTypeIcon(jsonIcon);
        setTypeFiles([txtType, xmlType]);
        break;
      default:
        return;
    }

    setInputFile(file);
    setInputFileName(file.name);
    await obtainContent(file);
  };

  return (
    <main style={{ padding: 32 }}>
      <h2 style={{ marginBottom: 12 }}>File converter & encrypter</h2>

      <div className={styles.containerFile}>
        <span className={styles.spanFile} id="spanFile">
          {inputFileName}
        </span>
        <Image
          src={inputTypeIcon}
          alt="file type icon"
          className={styles.iconFile}
          width={24}
          height={24}
        />
        <input
          className={styles.inputFile}
          type="file"
          id="file"
          name="file"
          accept=".txt, .json, .xml"
          onChange={(e) => onChangeFile(e.target.files[0])}
        />
      </div>

      <section
        style={{ display: originContent ? "flex" : "none" }}
        className={styles.sectionStyle}
      >
        <div>
          <div className={styles.preview}>
            <p>{originContent}</p>
          </div>

          <label name="delimitator">Delimitador</label>
          <input
            type="text"
            id="delimitator"
            name="delimitator"
            style={{ marginBottom: 20 }}
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
          />

          <label name="encryption_key">Clave de cifrado </label>
          <input
            type="text"
            id="encryption_key"
            name="encryption_key"
            value={secret}
            onChange={(e) => {
              setSecret(e.target.value);
            }}
          />
        </div>

        <div style={{ alignSelf: "center" }}>
          <label name="file_type">Elije el tipo de archivo a convertir:</label>
          <select
            id="file_type"
            name="file_type"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(parseInt(e.target.value));
            }}
            style={{ marginBottom: 20 }}
          >
            <option disabled value={-1}>
              --Seleccionar tipo--
            </option>
            {typeFiles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <button className={styles.btn} onClick={callConverter}>
            Convertir
          </button>
        </div>

        <div style={{ opacity: convertedContent ? 1 : 0 }}>
          <div className={styles.preview}>
            <p>{convertedContent}</p>
          </div>

          <a
            className={styles.btn}
            href={result.url}
            download={result.extension}
          >
            DOWNLOAD
          </a>
        </div>
      </section>
    </main>
  );
}