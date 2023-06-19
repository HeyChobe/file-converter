import { xmlToTxt } from "@/util/converterUtils";
import { decrypt, verifyToken } from "@/util/cryptoUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  const headersList = new Headers(req.headers);
  const token = headersList.get("Authorization").split(" ")[1];
  const tokenVerify = verifyToken(token);
  if (!tokenVerify)
    return NextResponse.json({
      status: false,
      blob: "",
      convertedContent: "",
    });
  const { content, encryptedKey, delimiter } = tokenVerify;
  console.log("1**********************");
  const key = decrypt(encryptedKey, process.env.NEXT_PUBLIC_PRIVATE_KEY);
  console.log("2**********************");
  const { blob, convertedContent } = xmlToTxt(content, delimiter, key);
  console.log("3**********************");
  const blobData = await new Response(blob).arrayBuffer();
  const blobBase64 = Buffer.from(blobData).toString("base64");
  return NextResponse.json({
    status: true,
    blob: blobBase64,
    convertedContent,
  });
}
