import { NextResponse } from 'next/server'
import NotionServer from '../../../lib/NotionServer'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any

const notionServer = new NotionServer()

export async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = await notionServer.query()
  return NextResponse.json(
    {
      res:data
    }
  );
}
