import type { FC } from "react";
import { PostType } from "../../@types/Post";
import Post from "./Post";
import styles from "./index.module.css";

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