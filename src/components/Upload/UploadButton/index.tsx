import { FC, useState } from "react";
import PlusIcon from "../../PlusIcon";
import UploadModal from "../UploadModal";

const UploadButton: FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsUploadModalOpen(true)}>
        <PlusIcon />
      </button>

      <UploadModal
        isUploadModalOpen={isUploadModalOpen}
        setIsUploadModalOpen={setIsUploadModalOpen}
      />
    </>
  )
};

export default UploadButton;