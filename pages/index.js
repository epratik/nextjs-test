import Head from 'next/head'
import Image from 'next/image'
import Render from './render'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Render></Render>
    </div>
  )
}
