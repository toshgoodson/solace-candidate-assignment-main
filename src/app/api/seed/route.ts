import { NextResponse } from "next/server";

export async function POST() {
  // If it was a small team, I'd just tell them directly and delete this file
  return NextResponse.json(
    { message: 'Please use `npm run seed`' },
    { status: 403 } 
  );
}
