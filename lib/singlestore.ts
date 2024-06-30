import { ApiClient, HttpApi } from '@singlestore/http-client';

const singleStoreInstance = ApiClient.instance;
const BasicAuth = singleStoreInstance.authentications['BasicAuth'];
BasicAuth.username = process.env.SINGLESTORE_WORKSPACE_USERNAME!;
BasicAuth.password = process.env.SINGLESTORE_WORKSPACE_PASSWORD!;
singleStoreInstance.basePath = 'https://' + process.env.SINGLESTORE_WORKSPACE_HOST!;
const singleStoreApi = new HttpApi();

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
        database: process.env.SINGLESTORE_DATABASE_NAME!,
        sql: query,
      }
    });
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
    throw new Error('Error creating table');
  }
}

export async function insertUser(id: number, email: string, name: string, username: string) {
  const query = `
    INSERT INTO users (id, email, name, username) 
    VALUES (?, ?, ?, ?);
  `;

  try {
    await singleStoreApi.rows({
      queryInput: {
        database: process.env.SINGLESTORE_DATABASE_NAME!,
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
