import { FC } from "react";
import CommentIcon from "../../CommentIcon";
import LikeIcon from "../../LikeIcon";
import styles from "./index.module.css";
import { database, ref, set } from "../../../services/firebase";
import { PostType } from "../../../@types/Post";
import moment from "moment";

type PostInfosProps = {
  post: PostType;
  postModal?: boolean;
  handleViewPost?: (e: any) => void;
}

const PostInfos: FC<PostInfosProps> = ({ post, handleViewPost, postModal = false }) => {
  const handleLike = () => {
    const postRef = ref(database, `posts/${post.id}`);
    const newPost = {...post, likes: post.likes + 1}
    set(postRef, newPost);
  }

  return (
    <>
      <div className={styles.actions}>
        <button type="button" onClick={handleLike}>
          <LikeIcon isLiked={post.likes > 0} />
        </button>
        <button type="button" onClick={handleViewPost}>
          <CommentIcon />
        </button>
        <span style={{ marginLeft: "5px" }}>{post.likes} {post.likes > 1 || post.likes === 0 ? "Curtidas" : "Curtida" }</span>
      </div>

      {!postModal &&
        <div className={styles.title}>
          <strong>{post?.username}</strong>
          <span>{post?.title}</span>
        </div>
      }

      <span className={styles.postedAt}>
        HÁ {moment(new Date(post?.postedAt)).fromNow(true).toUpperCase()}
      </span>
    </>
  )
}

export default PostInfos;