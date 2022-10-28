import { FC, useEffect, useState } from "react";
import { Dialog } from '@headlessui/react';
import styles from "./index.module.css";
import PlusIcon from "../../PlusIcon";
import Image from "next/image";
import { getUsername } from "../../../utils/getUsername";
import { database, push, ref, update, child } from "../../../services/firebase";
import FilesIcon from "./FilesIcon";
import XIcon from "./XIcon";

type UploadModalProps = {
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (isUploadModalOpen: boolean) => void;
}

const UploadModal: FC<UploadModalProps> = ({ isUploadModalOpen, setIsUploadModalOpen }) => {
  const [photo, setPhoto] = useState("");
  const [step, setStep] = useState(1);

  const handleClose = () => {
    setStep(1);
    setIsUploadModalOpen(false);
  }

  const getBase64 = (file: any) => {
    return new Promise(resolve => {
      let baseURL: any = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const changePhoto = (e: any) => {
    const { files } = e.target;
    const file = files[0];

    getBase64(file)
      .then((result: any) => {
        file["base64"] = result;
        setPhoto(result);
      })
      .catch(err => {
        console.log(err);
      });
    
    setStep(step+1)
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const { author, title } = e.target;
    if(!author.value) {
      alert("Você deve colocar seu nome no post!");
      return;
    }
    const username = getUsername(author.value.trim());

    const postRef = ref(database, "posts");
    const newPostKey: string | null = push(child(postRef, 'posts')).key;
    if(!newPostKey) return;
    const postData = {
      id: newPostKey,
      author: author.value.trim(),
      title: title.value.trim(),
      username,
      photo,
      likes: 0,
      postedAt: new Date().toString(),
      comments: [""],
    }
    const updates: any = {};
    updates[newPostKey] = postData;

    update(postRef, updates);
    handleClose();
  }
  
  return (
    <>
      <Dialog className={styles.modal} open={isUploadModalOpen} onClose={handleClose}>
        <Dialog.Panel className={styles.container}>
          <Dialog.Title style={{ display: "flex", justifyContent: "space-between", textAlign: "center", fontSize: "1.175rem", borderBottom: "1px solid #efefef", paddingBottom: "1.5em", color: "#262626", fontWeight: "500" }}>
            Criar nova publicação
            <button type="button" className={styles.closeButton} onClick={handleClose}>
              <XIcon />
            </button>
          </Dialog.Title>
          <Dialog.Description>
          </Dialog.Description>

          <form onSubmit={onSubmit} className={styles.uploadForm}>
            {step === 1 &&
              <section>
                <FilesIcon />
                <span>Arraste os fotos e os vídeos aqui</span>
                <label className={styles.button}>
                  Selecionar sua foto/vídeo
                  <input className={styles.fileInput} type="file" accept="image/*" onChange={changePhoto} />
                </label>
              </section>
            }
            {step === 2 &&
              <section style={{ display: "block", textAlign: "center" }}>
                <p>
                  Veja o preview da imagem
                </p>
                <div className={styles.preview} style={{ backgroundImage: `url(${photo})`}}></div>
                <button type="button" className={styles.button} onClick={() => setStep(step+1)}>Está perfeito</button>
              </section>
            }
            { step === 3 &&
              <section>
                <label style={{ width: "100%", maxWidth: "500px" }}>
                  <strong>Nome</strong>
                  <input name="author" type="text" placeholder="Anya Forger" />
                </label>

                <label style={{ width: "100%", maxWidth: "500px" }}>
                  <strong>Título</strong>
                  <input name="title" type="text" placeholder="Minduim" />
                </label>

                <div className={styles.actionButtons}>
                  <button type="submit" className={styles.uploadButton}>
                    Enviar
                  </button>
                </div>
              </section>
            }
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  )
};

export default UploadModal;