import NotionServer from "@/lib/NotionServer";
import { Data } from "ahooks/lib/usePagination/types";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


const notionServer = new NotionServer()

export async function GET(req, {params}) {


  const data = await notionServer.detail(params.id)
  console.log('data`', data)

  return NextResponse.json(
    {
      res:data
    }
  );
}
