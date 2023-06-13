import { txtToXml } from "@/util/converterUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { content } = await req.json();
    const blob = txtToXml(content);
    return new Response(blob, {
      headers: {
        "content-type": "application/xml",
      },
    });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
