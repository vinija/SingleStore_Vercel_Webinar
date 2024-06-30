import { NextApiRequest, NextApiResponse } from 'next';
import { createTable } from '@/lib/singlestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await createTable();
      res.status(200).json({ message: 'Table created successfully' });
    } catch (error) {
      console.error('Error creating table:', error);
      res.status(500).json({ error: 'Failed to create table', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
