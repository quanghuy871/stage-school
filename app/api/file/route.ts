import { NextResponse, NextRequest } from "next/server";
import * as FileType from "file-type";
import * as path from "path";
import remove from "confusables";
import client from "@/sanity/lib/client";

const allowedTypes = ["pdf", "doc", "docx", "txt", "rtf"];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { bytes, fullFileName, id } = body;

  if (!id) {
    return NextResponse.json(
      {
        message: "An unknown error occurred.",
        reason: `Missing Form ID as query parameter`,
      },
      { status: 400 }
    );
  }

  if (!bytes || !fullFileName) {
    return NextResponse.json(
      {
        message: "Missing required fields.",
        reason: "No file bytes or filename provided.",
      },
      { status: 400 }
    );
  }

  try {
    let fileExtension = path.extname(fullFileName) || "";

    let fileName = path.basename(fullFileName, fileExtension);
    fileName = remove(fileName);
    fileName = fileName.toLowerCase();

    const fileType = await FileType.fileTypeFromBuffer(
      Uint8Array.from(Object.values(bytes))
    );

    if (!fileType) {
      return NextResponse.json(
        {
          message: "Unsupported file type.",
          reason: "Could not determine file type.",
        },
        { status: 400 }
      );
    }

    if (!allowedTypes.includes(fileType.ext)) {
      return NextResponse.json(
        {
          message: "Invalid file type.",
          reason: `Only these file types are allowed: ${allowedTypes.join(", ")}`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "File type is valid.",
      meta: {
        fileType: fileType.mime,
        extension: fileType.ext,
        fileName: fullFileName,
      },
    });

  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json(
      {
        message: "An error occurred.",
        reason: err.message || "Unknown server error.",
      },
      { status: 500 }
    );
  }
}
