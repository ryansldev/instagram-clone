import { Dialog } from "@headlessui/react";
import type { FC } from "react";
import { PostType } from "../../../@types/Post";
import PostInfos from "../PostInfos";
import styles from "./index.module.css";

type PostModalProps = {
  isPostModalOpen: boolean;
  setIsPostModalOpen: (isPostModalOpen: boolean) => void;
  post: PostType;
}

const PostModal: FC<PostModalProps> = ({ post, isPostModalOpen, setIsPostModalOpen }) => {
  const handleClose = () => {
    document.querySelector(`#post-${post.id}`)?.scrollIntoView();
    setIsPostModalOpen(false);
  }
  
  return (
    <>
      <Dialog className={styles.modal} open={isPostModalOpen} onClose={handleClose}>
        <Dialog.Panel className={styles.container}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${post?.photo})`
            }}
          ></div>
          <div className={styles.content}>
            <div>
              <strong>{post?.username}</strong><br/>
              <span>{post?.title}</span>
            </div>

            <div></div>

            <div>
              <PostInfos post={post} postModal />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default PostModal;