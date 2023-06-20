import { txtToJson } from "@/util/converterUtils";
import { verifyToken } from "@/util/cryptoUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  const headersList = new Headers(req.headers);
  const token = headersList.get("Authorization").split(" ")[1];
  const tokenVerify = verifyToken(token);

  if (!tokenVerify) throw new Error("Token Invalido");

  const { encryptedContent, delimiter } = tokenVerify;
  const { blob, convertedContent } = txtToJson(encryptedContent, delimiter);
  const blobData = await new Response(blob).arrayBuffer();
  const blobBase64 = Buffer.from(blobData).toString("base64");

  return NextResponse.json({
    status: true,
    blob: blobBase64,
    convertedContent,
  });
}
