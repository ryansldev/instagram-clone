import type { FC } from "react";
import { AnswerType } from "../../../../../../@types/Post";
import { Answer } from "./Answer";
import styles from "./index.module.css";

type AnswersProps = {
  postId?: string;
  commentId: number;
  answers: AnswerType[];
}

export const Answers: FC<AnswersProps> = ({ postId, commentId, answers }) => {
  return (
    <>
      { answers && answers.length > 0 &&
        <div className={styles.answers}>
          {answers.map((answer, key) => (
            <div key={key}>
              <Answer postId={postId} answer={answer} commentId={commentId} id={key} />
            </div>
          ))}
        </div>
      }
    </>
  )
}