import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { CONSTANTS } from "@/app/constants";

export async function POST(request) {
  console.log("there is a banana");
  const requestBody = await request.json();
  const createdDate = new Date().toLocaleString();
  const newPost = { ...requestBody, date: createdDate };
  const filePath = path.join(process.cwd(), "db", "posts.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  data.push(newPost);
  fs.writeFileSync(filePath, JSON.stringify(data));
  // console.log(
  //   NextResponse.json({
  //     status: CONSTANTS.RESPONSE_STATUS.OK,
  //     data: { post: newPost },
  //   })
  // );
  console.log("**********************************************************************");
  return NextResponse.json({
    status: CONSTANTS.RESPONSE_STATUS.OK,
    data: { post: newPost },
  });
}
