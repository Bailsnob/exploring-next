import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import CONSTANTS from "@/app/constants";

export function GET(req) {
  let token = req.cookies.get("next-jwt")?.value;
  // middleware should be protecting the api; can assume there's a valid token
  const payload = jwt.decode(token);
  const email = payload.email;
  if (!email) return NextResponse.json({
    status: CONSTANTS.RESPONSE_STATUS.ERROR,
    data: "not authenticated"
  }, {
    status: 401
  });

  // connect to db and get users
  const filePath = path.join(process.cwd(), "app", "db", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  const user = data.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({
      status: CONSTANTS.RESPONSE_STATUS.ERROR,
      data: "user not found"
    }, {
      status: 401
    });
  }

  user.password = undefined;
  return NextResponse.json({status: CONSTANTS.RESPONSE_STATUS.OK, data: {user}});
}