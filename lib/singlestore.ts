import { ApiClient, HttpApi } from '@singlestore/http-client';

// SingleStore configuration
const singleStoreInstance = ApiClient.instance;
const BasicAuth = singleStoreInstance.authentications['BasicAuth'];
BasicAuth.username = process.env.SINGLESTORE_WORKSPACE_USERNAME!;
BasicAuth.password = process.env.SINGLESTORE_WORKSPACE_PASSWORD!;
singleStoreInstance.basePath = 'https://' + process.env.SINGLESTORE_WORKSPACE_HOST!;
const singleStoreApi = new HttpApi();

// Function to create the users table
export async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      username VARCHAR(255)
    );
  `;

  try {
    await singleStoreApi.rows({
      queryInput: {
        database: process.env.SINGLESTORE_DATABASE_NAME!, // ensure your environment variable is correct
        sql: query,
      }
    });
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
    throw new Error('Error creating table: ' + err.message);
  }
}

// Function to insert a user into the users table
export async function insertUser(id: number, email: string, name: string, username: string) {
  const query = `
    INSERT INTO users (id, email, name, username) 
    VALUES (?, ?, ?, ?);
  `;

  try {
    await singleStoreApi.rows({
      queryInput: {
        database: 'db_vinija_70211', // replace with your actual database name
        sql: query,
        parameters: [id, email, name, username]
      }
    });
    console.log('User inserted successfully');
  } catch (err) {
    console.error('Error inserting user:', err);
    throw new Error('Error inserting user');
  }
}

// Function to get all users from the users table
export async function getUsers() {
  const query = 'SELECT * FROM users;';

  try {
    const result = await singleStoreApi.rows({
      queryInput: {
        database: 'db_vinija_70211', // replace with your actual database name
        sql: query,
      }
    });
    return result.rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw new Error('Error fetching users');
  }
}
