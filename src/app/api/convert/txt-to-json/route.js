import { txtToJson } from "@/util/converterUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { content } = await req.json();
    const blob = txtToJson(content);
    return new Response(blob, {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}
