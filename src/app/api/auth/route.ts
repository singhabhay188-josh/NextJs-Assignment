import axios from "axios";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { httpMethods } from "../httpMethods";
import { cookies } from "next/headers";
import { JWT_SECRET } from "@/ENV";

export async function POST(req: Request) {
  const { username, pat } = await req.json();
  console.log("Recieved body", username, pat);

  if (!username || !pat) {
    return new Response("Invalid Inputs", { status: httpMethods.BAD_REQUEST });
  }

  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${pat}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response || !response.data) {
      return NextResponse.json(
        { success: false, message: "Invalid Personal Access Token" },
        { status: httpMethods.UNAUTHORIZED },
      );
    }

    const user = response.data;

    if (user.login !== username) {
      return NextResponse.json(
        { success: false, message: "Invalid Username" },
        { status: httpMethods.UNAUTHORIZED },
      );
    }

    const token = jwt.sign({ "user": pat }, JWT_SECRET, { expiresIn: "1h" });

    const cookieStore = await cookies();

    cookieStore.set("token", token);

    return NextResponse.json(
      { success: true, token },
      { status: httpMethods.OK },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid Credentials" },
      { status: httpMethods.UNAUTHORIZED },
    );
  }
}
