import { FC, useCallback, useState } from "react";
import { Dialog } from '@headlessui/react';
import styles from "./index.module.css";
import { getUsername } from "../../../utils/getUsername";
import { database, push, ref, update, child } from "../../../services/firebase";
import FilesIcon from "./FilesIcon";
import XIcon from "./XIcon";
import { BackIcon } from "./BackIcon";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "../../../utils/cropImage";

type UploadModalProps = {
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (isUploadModalOpen: boolean) => void;
}

const UploadModal: FC<UploadModalProps> = ({ isUploadModalOpen, setIsUploadModalOpen }) => {
  const [photo, setPhoto] = useState("");
  const [step, setStep] = useState(1);

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()

  const [croppedPhoto, setCroppedPhoto] = useState<any>();

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
    setCroppedImage();
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
      photo: croppedPhoto,
      likes: 0,
      postedAt: new Date().toString(),
      comments: [""],
    }
    const updates: any = {};
    updates[newPostKey] = postData;

    update(postRef, updates);
    handleClose();
  }

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const setCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        photo,
        croppedAreaPixels,
        rotation
      )
      setCroppedPhoto(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])
  
  return (
    <>
      <Dialog className={styles.modal} open={isUploadModalOpen} onClose={handleClose}>
        <Dialog.Panel className={styles.container}>
          <Dialog.Title style={{ display: "flex", justifyContent: "space-between", textAlign: "center", fontSize: "1.175rem", borderBottom: "1px solid #efefef", paddingBottom: "1.5em", color: "#262626", fontWeight: "500" }}>
            {step > 1 &&
              <button type="button" className={styles.backButton} onClick={() => setStep(step-1)}>
                <BackIcon />
              </button>
            }
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
                  <input className={styles.fileInput} type="file" accept="image/jpeg, image/png" onChange={changePhoto} />
                </label>
              </section>
            }
            {step === 2 &&
              <section style={{ display: "block", textAlign: "center" }}>
                <p>
                  Veja o preview da imagem
                </p>
                <div style={{ position: "relative", height: "100%", width: "100%" }}>
                  <Cropper
                    image={photo}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onMediaLoaded={setCroppedImage}
                  />
                </div>
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