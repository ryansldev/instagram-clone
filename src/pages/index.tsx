import Head from 'next/head'
import { useEffect, useState } from 'react'
import { PostType } from '../@types/Post';
import Posts from '../components/Posts'
import { database, ref, onValue } from "../services/firebase";

export default function Home() {
  return (
    <main style={{ marginTop: "100px" }}>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram clone" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>
        <Posts />
      </div>
    </main>
  )
}
