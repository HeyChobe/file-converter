"use client";

import './global.css';
import uploadIcon from './upload-icon.svg'
import txtIcon from './txt-icon.svg'
import jsonIcon from './json-icon.svg'
import xmlIcon from './xml-icon.svg'
import styles from "./page.module.css";
import Image from 'next/image'
import { useFileConverter } from "@/hooks/useFileConverter";
import { useState } from 'react';

class TypeFile {
  id;
  name;

  constructor(idP, nameP) {
    this.id = idP;
    this.name = nameP;
  }
}
const txtType = new TypeFile(0, '.txt');
const jsonType = new TypeFile(1, '.json');
const xmlType = new TypeFile(2, '.xml');

export default function Home() {
  const {
    result,
    originContent,
    obtainContent,
  } = useFileConverter();

  const [inputFileName, setInputFileName] = useState('Subir archivo');
  const [inputTypeIcon, setInputTypeIcon] = useState(uploadIcon);
  const [typeFiles, setTypeFiles] = useState([txtType, jsonType, xmlType]);

  const [generatedPreview, setGeneratedPreview] = useState('');

  const callConverter = async () => {
    console.log('Should call API here');
    setGeneratedPreview('asdasd');
  }

  const onChangeFile = async (file) => {
    if (!file){
      alert("error");
      return;
    }

    switch (file.type) {
      case 'text/plain':
        setInputTypeIcon(txtIcon);
        setTypeFiles([jsonType, xmlType]);
        break;
      case 'text/xml':
        setInputTypeIcon(xmlIcon);
        setTypeFiles([txtType, jsonType]);
        break;
      case 'application/json':
        setInputTypeIcon(jsonIcon);
        setTypeFiles([txtType, xmlType]);
        break;
      default:
        return;
    }

    setInputFileName(file.name);
    await obtainContent(file);
  };

  return (
    <main style={{ padding: 32 }}>
      <h2 style={{ marginBottom: 12 }}>File converter & encrypter</h2>

      <div className={styles.containerFile}>
        {/* <Image src={inputTypeIcon} alt="file type icon" className={styles.iconFile} width={24} height={24} /> */}
        <span className={styles.spanFile} id="spanFile">{inputFileName}</span>
        <Image src={inputTypeIcon} alt="file type icon" className={styles.iconFile} width={24} height={24} />
        <input
          className={styles.inputFile}
          type="file"
          id="file"
          name="file"
          accept=".txt, .json, .xml"
          onChange={(e) => onChangeFile(e.target.files[0])}
        />
      </div>

      <section style={{ display: originContent ? "flex" : "none" }} className={styles.sectionStyle}>
        <div>
          <div className={styles.preview}>
            <p>{originContent}</p>
          </div>

          <label name="delimitator">Delimitador</label>
          <input type="text" id="delimitator" name="delimitator" style={{ marginBottom: 20 }} />

          <label name="encryption_key">Clave de cifrado  </label>
          <input type="text" id="encryption_key" name="encryption_key" />
        </div>

        <div style={{ alignSelf: 'center' }}>
          <label name="file_type">Elije el tipo de archivo a convertir:</label>
          <select id="file_type" name="file_type" defaultValue={"def"} style={{ marginBottom: 20 }}>
            <option disabled value={"def"}>--Selecionar tipo--</option>
            {
              typeFiles.map(
                (item) => {
                  return (<option key={item.id} value={item.id}>{item.name}</option>)
                }
              )
            }
          </select>

          <button className={styles.btn} onClick={callConverter}>Convertir</button>
        </div>

        <div style={{ opacity: generatedPreview ? 1 : 0 }}>
          <div className={styles.preview}>
            <p>{generatedPreview}</p>
          </div>

          <a className={styles.btn} href={result.url} download={result.extension}>DOWNLOAD</a>
        </div>
      </section>
    </main>
  );
}
