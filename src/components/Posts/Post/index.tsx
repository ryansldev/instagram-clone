import { FC, useState } from "react";
import styles from "./index.module.css";
import LikeIcon from "../../LikeIcon";
import { PostType } from "../../../@types/Post";
import { database, ref, set } from "../../../services/firebase";

const Post: FC<{ post: PostType }> = ({ post }) => {
  const handleLike = () => {
    const postRef = ref(database, `posts/${post.id}`);
    const newPost = {...post, likes: post.likes + 1}
    set(postRef, newPost);
  }

  return (
    <article className={styles.article}>
      <div className={styles.author}>
        <span>Postado por <strong>{post.author}</strong></span>
      </div>
      <div
        id={`image-${post.id}`}
        className={styles.image}
        style={{
          backgroundImage: `url(${post.photo})`
        }}
      ></div>
      <div className={styles.content}>
        <div className={styles.actions}>
          <button type="button" onClick={handleLike}>
            <LikeIcon isLiked={post.likes > 0} />
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