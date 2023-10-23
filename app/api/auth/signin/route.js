import { NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";
import fs from "fs";
import path from "path";
import * as jose from "jose";
import { comparePasswords } from "@/app/utils/password-util";
import CONSTANTS from "@/app/constants";

export async function POST(req) {
  const reqBody = await req.json();
  const { email, password } = reqBody;

  //connect to database and get all users
  const filePath = path.join(process.cwd(), "app", "db", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  //check if user email is valid
  const user = data.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({
      status: CONSTANTS.RESPONSE_STATUS.ERROR,
      data: "invalid email"
    }, {status: 401});
  }

  //check is password is valid
  const passwordIsValid = await comparePasswords(password, user.password);
  if (!passwordIsValid) {
    return NextResponse.json({
      status: CONSTANTS.RESPONSE_STATUS.ERROR,
      data: "invalid password"
    }, {status: 401});
  }

  // Note: distinguishing btwn invalid email and invalid password makes it easier for hackers to hack site
  // also helps user

  // create JWT
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({
    email: user.email,
    role: user.role, //TODO
  }).setProtectedHeader({ alg }).setExpirationTime("48h").sign(secret);
  // setProtectedHeader chooses the encryption algorithm

  // store JWT in cookie
  cookies().set("next-jwt", token, { maxAge: 2 * 60 * 60 * 24 });

  // protect password hacking
  user.password = undefined; // prevents hackers from finding; removes from sendback package
  return NextResponse.json({
    status: CONSTANTS.RESPONSE_STATUS.OK,
    data: {user}, // creates an object literal user: user
  });
}