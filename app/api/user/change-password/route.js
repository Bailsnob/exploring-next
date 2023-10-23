import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import * as jose from "jose";
import { comparePasswords, hashPassword } from "@/app/utils/password-util";
import CONSTANTS from "@/app/constants";

export async function POST(req) {
  console.log("**********************************");
  console.log(req);
  const reqBody = await req.json();
  console.log("**********************************");
  console.log(reqBody);
  const { newPassword, oldPassword } = reqBody;
  console.log(newPassword, oldPassword);
  const token = req.cookies.get("next-jwt")?.value; // (thing.something() !== undefined) ? thing.something() : undefined
  console.log(token);
  if (!token) {
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: "not authenticated",
      },
      { status: 401 }
    );
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const result = await jose.jwtVerify(token, secret);
  const email = result.payload.email;
  if (!newPassword || newPassword.trim().length < 8) {
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: "invalid new password or password length below 8",
      },
      { status: 422 }
    );
  }
  const filePath = path.join(process.cwd(), "app", "db", "users.json"); // protects against bad pathing (one / or 2 /s, etc)
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const user = data.find((u) => u.email === email);
  if (!user) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: "unfound user",
      },
      { status: 404 }
    );
  }
  const isPasswordValid = await comparePasswords(oldPassword, user.password);
  if (!isPasswordValid) {
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: "invalid old password",
      },
      { status: 403 }
    );
  }
  user.password = await hashPassword(newPassword);
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log("ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc");
  return NextResponse.json(
    {
      status: CONSTANTS.RESPONSE_STATUS.OK,
      data: "updated password successfully",
    },
    { status: 201 }
  );
}
