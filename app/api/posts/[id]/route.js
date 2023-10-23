import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import CONSTANTS from "@/app/constants"

export function GET(request, {params}) {
  const id = params.id;
  const filePath = path.join(process.cwd(), "app", "db", "posts.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const post = data.find((p) => p.id === id);
  return NextResponse.json({ status: CONSTANTS.RESPONSE_STATUS.OK, data: {post,} });
}