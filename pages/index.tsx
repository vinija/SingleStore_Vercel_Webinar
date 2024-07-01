// pages/index.tsx
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [rows, setRows] = useState([])

  const addRow = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newRow = {
      id: rows.length + 1,
      name: formData.get('name'),
      email: formData.get('email'),
    }
    setRows([...rows, newRow])
    event.target.reset()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SingleStore, Vercel, Next.js Demo</title>
        <meta name="description" content="Demo for SingleStore, Vercel, and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <img src="/singlestore.png" alt="SingleStore Logo" className={styles.logo} />
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        <img src="/next.svg" alt="Next.js Logo" className={styles.logo} />


      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the Demo</h1>
        <form className={styles.form} onSubmit={addRow}>
          <input type="text" name="name" placeholder="Name" required className={styles.input} />
          <input type="email" name="email" placeholder="Email" required className={styles.input} />
          <button type="submit" className={styles.button}>Add Row</button>
        </form>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
