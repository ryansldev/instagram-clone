import { Dialog } from "@headlessui/react";
import moment from "moment";
import Image from "next/image";
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
              <div className={styles.basicContent}>
                <strong>{post?.username}</strong><br/>
                <span>{post?.title}</span>
              </div>
              { post?.comments && post?.comments[0].content &&
                <div className={styles.comments}>
                  {post?.comments.map((comment, key) => (
                    <div className={styles.comment} key={key}>
                      {comment.content &&
                        <>
                          <Image src="/assets/user.png" alt="Usuário Anônimo" height={28} width={28} />
                          <div className={styles.commentContent}>
                            <span><strong>anônimo</strong> {comment.content}</span>
                            <span className={styles.commentedAt}>
                              HÁ {moment(new Date(comment?.commentedAt)).fromNow(true).toUpperCase()}
                            </span>
                          </div>
                        </>
                      }
                    </div>
                  ))}
                </div>
              }
            </div>

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