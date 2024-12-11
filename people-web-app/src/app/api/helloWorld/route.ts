import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export function GET(req: NextApiRequest, res: NextApiResponse) {
  return NextResponse.json({ message: 'Hello, World' }, { status: 200 });
}
