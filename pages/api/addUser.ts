import { NextApiRequest, NextApiResponse } from 'next';
import { insertUser } from '@/lib/singlestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, email, name, username } = req.body;

  try {
    await insertUser(id, email, name, username);
    res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
}
