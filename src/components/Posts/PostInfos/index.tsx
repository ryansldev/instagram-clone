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
    console.log(newPost);
    set(postRef, newPost);
  }

  const sendComment = (e: any) => {
    e.preventDefault();
    const { comment } = e.target;
    const postRef = ref(database, `posts/${post.id}`);
    const newComments = post?.comments ? post?.comments : [];
    newComments.push({
      commentedAt: new Date().toString(),
      content: comment.value,
    });
    const newPost = {
      ...post,
      comments: newComments,
    }
    set(postRef, newPost);
  }

  return (
    <>
      <div
        className={styles.actions}
        style={{
          padding: `${postModal ? "1.5em 1em 0 1em" : "0" }`,
          borderTop: `${postModal ? "1px solid #efefef" : ""}`
        }}
      >
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

      <span
        className={styles.postedAt}
        style={{
          margin: `${postModal ? "0em 2em" : "0" }`
        }}
      >
        HÁ {moment(new Date(post?.postedAt)).fromNow(true).toUpperCase()}
      </span>

      <form className={styles.sendCommentForm} onSubmit={sendComment} style={{ marginTop: `${postModal ? "1.5em" : "0" }`}}>
        <input
          name="comment"
          placeholder="Adicione um comentário..."
          style={{
            padding: `${postModal ? "0 2em" : "0 1em" }`
          }}
        />
        <button type="submit">
          Publicar
        </button>
      </form>
    </>
  )
}

export default PostInfos;