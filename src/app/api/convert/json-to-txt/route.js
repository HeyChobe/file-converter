import { jsonToTxt } from "@/util/converterUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { content } = await req.json();
    const blob = jsonToTxt(content);
    return new Response(blob, {
      headers: {
        "content-type": "text/plain",
      },
    });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
