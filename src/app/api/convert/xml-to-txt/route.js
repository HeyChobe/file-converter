import { xmlToTxt } from "@/util/converterUtils";
import { decrypt, verifyToken } from "@/util/cryptoUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  const headersList = new Headers(req.headers);
  const token = headersList.get("Authorization").split(" ")[1];
  const tokenVerify = verifyToken(token);

  if (!tokenVerify) throw new Error("Token Invalido");

  const { content, encryptedKey, delimiter } = tokenVerify;
  const key = decrypt(encryptedKey, process.env.NEXT_PUBLIC_PRIVATE_KEY);
  const { blob, convertedContent } = xmlToTxt(content, delimiter, key);
  const blobData = await new Response(blob).arrayBuffer();
  const blobBase64 = Buffer.from(blobData).toString("base64");
  return NextResponse.json({
    status: true,
    blob: blobBase64,
    convertedContent,
  });
}
