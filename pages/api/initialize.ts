import { NextApiRequest, NextApiResponse } from 'next';
import { createTable } from '@/lib/singlestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await createTable();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ message: 'Table created successfully' });
  } catch (error) {
    console.error('Failed to create table:', error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Failed to create table' });
  }
}
