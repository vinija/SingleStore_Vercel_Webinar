import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '../../lib/singlestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await getUsers(); // Implement getUsers in singlestore.ts
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
}
