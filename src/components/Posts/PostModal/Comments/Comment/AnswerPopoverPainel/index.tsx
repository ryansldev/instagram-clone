import { Popover } from "@headlessui/react";
import type { FC } from "react";
import { AnswerType } from "../../../../../../@types/Post";
import { database, ref, set } from "../../../../../../services/firebase";
import styles from "./index.module.css";

type AnswerPopoverPanelType = {
  postId?: string;
  answers: AnswerType[];
  commentId: number;
}

const AnswerPopoverPanel: FC<AnswerPopoverPanelType> = ({ postId, answers, commentId }) => {
  const onSubmit = (e: any) => {
    e.preventDefault();
    const { answer } = e.target;
    const answersRef = ref(database, `posts/${postId}/comments/${commentId}/answers`);
    const newAnswers = answers ? answers : [];
    newAnswers.push({
      likes: 0,
      content: answer.value,
      answeredAt: new Date().toString(),
    });

    set(answersRef, newAnswers);
  };

  return (
    <Popover.Panel className={styles.answerPopoverPanel}>
      <form onSubmit={onSubmit}>
        <label>
          <input name="answer" type="text" placeholder="Comentário..." />
          <button type="submit">
            Publicar
          </button>
        </label>
      </form>
    </Popover.Panel>
  )
};

export default AnswerPopoverPanel;