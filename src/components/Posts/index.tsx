import { FC, useEffect, useState } from "react";
import { PostType } from "../../@types/Post";
import Post from "./Post";
import styles from "./index.module.css";
import { database, ref, onValue } from "../../services/firebase";

type FirebasePosts = Record<string, PostType>;

const Posts: FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    const postsRef = ref(database, 'posts');
    onValue(postsRef, (snapshot) => {
      const data: FirebasePosts = snapshot.val();
      if(data) {
        const parsedData: PostType[] = Object.entries(data).map(([key, value]) => {
          return {
            id: key,
            author: value.author,
            username: value.username,
            title: value.title,
            photo: value.photo,
            likes: value.likes,
            postedAt: value.postedAt,
            comments: value.comments,
          }
        });

        // Sort the posts in descending order based on `postedAt`
        const sortedData = parsedData.sort((a, b) => {
          const dateA = new Date(a.postedAt).getTime();
          const dateB = new Date(b.postedAt).getTime();
          return dateB - dateA; // Descending order
        });

        setPosts(sortedData);
      }
    });
  }, []);

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