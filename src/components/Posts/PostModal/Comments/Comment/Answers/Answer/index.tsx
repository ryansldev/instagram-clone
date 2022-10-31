import type { FC } from "react";
import styles from "./index.module.css";
import { AnswerType } from "../../../../../../../@types/Post";
import Image from "next/image";
import moment from "moment";
import LikeIcon from "../../../../../../LikeIcon";
import { database, ref, set } from "../../../../../../../services/firebase";

type AnswerProps = {
  postId?: string;
  commentId: number;
  answer: AnswerType;
  id: number;
}

export const Answer: FC<AnswerProps> = ({ answer, postId, commentId, id }) => {
  const handleLike = () => {
    const answerRef = ref(database, `posts/${postId}/comments/${commentId}/answers/${id}`);
    const newAnswer = {...answer, likes: answer.likes + 1}
    set(answerRef, newAnswer);
  };

  return (
    <>
      {answer.content &&
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1em" }}>
          <div className={styles.answer}>
            <Image src="/assets/user.png" alt="Usuário Anônimo" height={28} width={28} />
            <div className={styles.answerContent}>
              <span><strong>anônimo</strong> {answer.content}</span>
              <div style={{ flexWrap: "wrap" }}>
                <span className={styles.answeredAt}>
                  HÁ {moment(new Date(answer?.answeredAt)).fromNow(true).toUpperCase()}
                </span>
                { answer.likes > 0 && <span style={{ fontSize: "0.75rem" }}>{answer.likes} {answer.likes > 1 ? "curtidas" : "curtida" }</span> }
              </div>
            </div>
          </div>

          <button type="button" className={styles.likeButton} onClick={handleLike}>
            <LikeIcon isLiked={answer.likes > 0} style={{ width: "1em" }} />
          </button>
        </div>
      }
    </>
  )
}