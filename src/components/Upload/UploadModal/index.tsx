import { FC, useEffect, useState } from "react";
import { Dialog } from '@headlessui/react';
import styles from "./index.module.css";
import PlusIcon from "../../PlusIcon";
import Image from "next/image";

type UploadModalProps = {
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (isUploadModalOpen: boolean) => void;
}

const UploadModal: FC<UploadModalProps> = ({ isUploadModalOpen, setIsUploadModalOpen }) => {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const header: any = document.querySelector("header")!;
    if(isUploadModalOpen) {
      header.style.display = "none";
    } else {
      header.style.display = "flex";
    }
  }, [isUploadModalOpen]);

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
  };
  
  return (
    <>
      <Dialog className={styles.modal} open={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}>
        <Dialog.Panel className={styles.container}>
          <Dialog.Title>Enviar post</Dialog.Title>
          <Dialog.Description>
            Faça o upload da foto e dê algumas informações para publicar seu post!
          </Dialog.Description>

          <form className={styles.uploadForm}>
            <label>
              <strong>Nome</strong>
              <input type="text" placeholder="Anya Forger" />
            </label>

            <label>
              <strong>Título</strong>
              <input type="text" placeholder="Minduim" />
            </label>

            <label>
              <span style={{ margin: "0.5em 0" }}>Tamanho recomendado: 1080x1080</span>
              <input type="file" accept="image/*" onChange={changePhoto} />
            </label>

            <p>
              { photo.length === 0 ? "Fique com gatinhos já que não enviou nada" : "Veja o preview do post:" }
            </p>
            { photo.length === 0 ? (
              <Image alt="Anya Forger" src="/assets/nothing.gif" width={250} height={250} />
            ) : (
              <div className={styles.preview} style={{ backgroundImage: `url(${photo})`}}></div>
            )}

            <div className={styles.actionButtons}>
              <button type="submit" className={styles.uploadButton} onClick={() => setIsUploadModalOpen(false)}>
                <PlusIcon fill="#f7f5f5" color="f7f5f5" />
                UPLOAD
              </button>
              <button type="button" className={styles.closeButton} onClick={() => setIsUploadModalOpen(false)}>
                FECHAR
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  )
};

export default UploadModal;