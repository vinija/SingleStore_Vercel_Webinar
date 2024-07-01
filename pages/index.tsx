import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [formData, setFormData] = useState({ email: '', name: '', username: '' });
  const [users, setUsers] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsers([...users, formData]);
    setFormData({ email: '', name: '', username: '' });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src="/singlestore.png" alt="SingleStore Logo" width={150} height={50} />
        <Image src="/vercel.svg" alt="Vercel Logo" width={150} height={50} />
        <Image src="/next.svg" alt="Next.js Logo" width={150} height={50} />
        <h1>July 2nd</h1>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>User Information</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.submitButton} type="submit">Submit</button>
        </form>

        <h2 className={styles.subtitle}>Users</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;
