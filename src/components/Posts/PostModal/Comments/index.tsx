import type { FC } from "react";
import type { PostType } from "../../../../@types/Post";
import Comment from "./Comment";

import styles from "./index.module.css";

type CommentsProps = {
  post: PostType;
}

const Comments: FC<CommentsProps> = ({ post }) => {
  return (
    <>
      { post?.comments && post?.comments.length > 0 &&
        <div className={styles.comments}>
          {post?.comments.map((comment, key) => (
            <div key={key}>
              <Comment postId={post?.id} comment={comment} id={key} />
            </div>
          ))}
        </div>
      }
    </>
  )
}

export default Comments;