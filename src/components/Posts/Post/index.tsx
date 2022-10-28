import { FC, useState } from "react";
import styles from "./index.module.css";
import { PostType } from "../../../@types/Post";
import PostInfos from "../PostInfos";
import PostModal from "../PostModal";

type PostProps = {
  post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  const handleViewPost = () => {
    document.querySelector("#header")?.scrollIntoView();
    setIsPostModalOpen(true);
  };

  return (
    <>
      <article className={styles.article} id={`post-${post.id}`}>
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
          <PostInfos
            post={post}
            handleViewPost={handleViewPost}
          />
        </div>
      </article>

      <PostModal
        key={post?.id}
        isPostModalOpen={isPostModalOpen}
        setIsPostModalOpen={setIsPostModalOpen}
        post={post}
      />
    </>
  )
};

export default Post;