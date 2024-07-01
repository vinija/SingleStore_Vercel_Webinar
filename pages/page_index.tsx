// pages/index.tsx
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

// Function to classify name by calling the Genderize.io API
const classifyName = async (name) => {
  const apiKey = 'your_api_key_here'; // Replace with your Genderize.io API key
  try {
    const response = await fetch(`https://api.genderize.io?name=${name}&apikey=${apiKey}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.gender ? data.gender : 'Unknown'
  } catch (error) {
    console.error('Error classifying name:', error)
    return 'Unknown'
  }
}

export default function Home() {
  const [rows, setRows] = useState([])

  const addRow = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const classification = await classifyName(name)

    const newRow = {
      id: rows.length + 1,
      name,
      email,
      classification
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
              <th>Classification</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.classification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
