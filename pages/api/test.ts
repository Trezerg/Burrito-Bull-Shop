import type { NextApiRequest, NextApiResponse } from 'next';
import { getWooClient } from '../../lib/wooClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const api = getWooClient('MAIN');
    const { data } = await api.get('products?per_page=1');
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
