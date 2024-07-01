import { NextApiRequest, NextApiResponse } from 'next';
import { createTable } from '@/lib/singlestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await createTable();
    res.status(200).json({ message: 'Table created successfully' });
  } catch (error) {
    console.error('Failed to create table:', error);
    res.status(500).json({ error: 'Failed to create table' });
  }
}
