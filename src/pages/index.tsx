import Head from 'next/head'
import Posts from '../components/Posts'

export default function Home() {
  return (
    <main>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram clone" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>
        <Posts
          posts={[
            {
              author: "Diego Fernandes",
              username: "diegofernandes",
              title: "Test post",
              likes: 2,
              postedAt: new Date(),
              isLiked: false,
            },
            {
              author: "Mayk Brito",
              username: "maykbrito",
              title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae tempor odio. Nunc iaculis malesuada iaculis. Proin in mauris ac velit auctor lacinia vitae id magna. Suspendisse et ornare tellus. Cras sit amet posuere ante. Ut cursus id mauris vel euismod. Nullam eu lectus sollicitudin tellus feugiat mattis.",
              likes: 5,
              postedAt: new Date(),
              isLiked: true,
            }
          ]}
        />
      </div>
    </main>
  )
}
