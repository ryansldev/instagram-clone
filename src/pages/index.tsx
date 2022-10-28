import Head from 'next/head'
import { useEffect, useState } from 'react'
import { PostType } from '../@types/Post';
import Posts from '../components/Posts'
import { database, ref, onValue } from "../services/firebase";

type FirebasePosts = Record<string, PostType>;

export default function Home() {
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

        setPosts(parsedData);
      }
    });
  }, []);

  return (
    <main>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram clone" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>
        <Posts
          posts={posts}
        />
      </div>
    </main>
  )
}
