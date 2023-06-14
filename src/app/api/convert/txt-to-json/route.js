import { txtToJson } from "@/util/converterUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { content } = await req.json();
  const { blob, convertedContent } = txtToJson(content);
  const blobData = await new Response(blob).arrayBuffer();
  const blobBase64 = Buffer.from(blobData).toString("base64");
  return NextResponse.json({
    status: true,
    blob: blobBase64,
    convertedContent,
  });
}
