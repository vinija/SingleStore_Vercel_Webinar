// pages/api/addUser.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { insertUser } from '../../lib/singlestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, email, name, username } = req.body;
  try {
    await insertUser(parseInt(id), email, name, username); // Assuming your `insertUser` function works as expected
    res.status(200).json({ id, email, name, username });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add user', error: error.message });
  }
}
