import { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState({ id: '', email: '', name: '', username: '' });
  const [userList, setUserList] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const addedUser = await response.json();
        setUserList([...userList, addedUser]);
        setUser({ id: '', email: '', name: '', username: '' }); // Clear form after submission
      }
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  useEffect(() => {
    // Fetch the initial user list from your database
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/getUsers');
        if (response.ok) {
          const users = await response.json();
          setUserList(users);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="ID" value={user.id} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <h2>User List</h2>
      <ul>
        {userList.map((u, index) => (
          <li key={index}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
