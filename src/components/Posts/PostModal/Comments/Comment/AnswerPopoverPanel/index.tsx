import { Popover } from "@headlessui/react";
import styles from "./index.module.css";

const AnswerPopoverPanel = () => {
  return (
    <Popover.Panel className={styles.answerPopoverPanel}>
      <label>
        <input type="text" placeholder="Comentário..." />
        <button type="button">
          Publicar
        </button>
      </label>
    </Popover.Panel>
  )
};

export default AnswerPopoverPanel;