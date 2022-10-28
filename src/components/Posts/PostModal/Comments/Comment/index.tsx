import { FC, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { Comment } from "../../../../../@types/Post";
import styles from "./index.module.css";
import LikeIcon from "../../../../LikeIcon";
import { database, ref, set } from "../../../../../services/firebase";

type CommentProps = {
  postId: string | undefined;
  comment: Comment;
  id: number;
}

const Comment: FC<CommentProps> = ({ postId, comment, id }) => {
  const handleLike = () => {
    const postRef = ref(database, `posts/${postId}/comments/${id}`);
    const newComment = {...comment, likes: comment.likes + 1}
    set(postRef, newComment);
  };

  return (
    <>
      {comment.content &&
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1em" }}>
          <div className={styles.comment}>
            <Image src="/assets/user.png" alt="Usuário Anônimo" height={28} width={28} />
            <div className={styles.commentContent}>
              <span><strong>anônimo</strong> {comment.content}</span>
              <div style={{ flexWrap: "wrap" }}>
                <span className={styles.commentedAt}>
                  HÁ {moment(new Date(comment?.commentedAt)).fromNow(true).toUpperCase()}
                </span>
                { comment.likes > 0 && <span>{comment.likes} {comment.likes > 1 ? "curtidas" : "curtida" }</span> }
              </div>
            </div>
          </div>

          <button type="button" className={styles.likeButton} onClick={handleLike}>
            <LikeIcon isLiked={comment.likes > 0} style={{ width: "1em" }} />
          </button>
        </div>
      }
    </>
  )
};

export default Comment;