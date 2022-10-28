import { FC, useState } from "react";
import { PostType } from "../../@types/Post";
import Post from "./Post";
import styles from "./index.module.css";
import PostModal from "./PostModal";

const Posts: FC<{ posts: PostType[] }> = ({ posts }) => {
  return (
    <div className={styles.posts}>
      {posts && posts.map((post, key) => (
        <Post
          post={post}
          key={key}
        />
      ))}
    </div>
  )
};

export default Posts;