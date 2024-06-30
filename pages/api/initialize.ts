import { NextApiRequest, NextApiResponse } from 'next';
import { createTable } from '@/lib/singlestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await createTable();
    res.status(200).json({ message: 'Table created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create table' });
  }
}
