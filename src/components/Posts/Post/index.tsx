import { FC, useState } from "react";
import styles from "./index.module.css";
import LikeIcon from "../../LikeIcon";
import { PostType } from "../../../@types/Post";

const Post: FC<{ post: PostType }> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.likes > 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
  }

  return (
    <article className={styles.article}>
      <div className={styles.author}>
        <span>Postado por <strong>{post.author}</strong></span>
      </div>
      <div className={styles.image}></div>
      <div className={styles.content}>
        <div className={styles.actions}>
          <button type="button" onClick={handleLike}>
            <LikeIcon isLiked={isLiked} />
          </button>
          <span>{post.likes} {post.likes > 1 || post.likes === 0 ? "Curtidas" : "Curtida" }</span>
        </div>
        <div className={styles.title}>
          <strong>{post.username}</strong>
          <span>{post.title}</span>
        </div>
      </div>
    </article>
  )
};

export default Post;