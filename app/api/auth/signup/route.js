import { NextResponse } from "next/server"; // object that provides utility methods for making http responses
import { cookies } from "next/dist/client/components/headers"; // used to set cookies
import path from "path"; // helps manage file and directory paths
import fs from "fs"; // importing default export from fs
import * as jose from "jose"; // has JOSE standards for manipulating JWT; importing all exports because no default
import { hashPassword } from "@/app/utils/password-util";
import CONSTANTS from "@/app/constants";

// async function that takes in a req and res (haven't used res yet)
export async function POST(req, res) {
  const requestBody = await req.json();
  const { email, password, name } = requestBody;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 8
  ) {
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: "invalid email or password; min password length 8",
      },
      { status: 422 }
    );
  }

  //connect to db and get all users
  const filePath = path.join(process.cwd(), "app", "db", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  //check if user exists
  const user = data.find((u) => u.email === email);
  if (user) {
    return NextResponse.json(
      {
        status: CONSTANTS.RESPONSE_STATUS.ERROR,
        data: "user already exists",
      },
      { status: 422 }
    );
  }

  //store new user in db
  const hashedPassword = await hashPassword(password);
  data.push({ email, password: hashedPassword, name });
  fs.writeFileSync(filePath, JSON.stringify(data));

  //create JWT
  const alg = "HS256"; // name of a particular JWT algorithm
  const secret = new TextEncoder().encode(process.env.JWT_SECRET); //
  const token = await new jose.SignJWT({ email })
    .setProtectedHeader({ alg })
    .setExpirationTime("48h")
    .sign(secret);

  //storing JWT in cookies
  cookies().set("next-jwt", token, { maxAge: 60 * 60 * 24 * 2 }); // 2 days in seconds

  return NextResponse.json(
    {
      status: CONSTANTS.RESPONSE_STATUS.OK,
      data: "created user successfully",
    },
    { status: 201 }
  );
}
