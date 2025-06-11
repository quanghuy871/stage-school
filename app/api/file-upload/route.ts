import { NextResponse, NextRequest } from "next/server";
import * as FileType from "file-type";
import * as path from "path";
import remove from "confusables";
import client from "@/sanity/lib/client";

export async function POST(req: NextRequest) {

  const formData = await req.formData();
  const file = formData.get("file") as File;

  try {
    const sanityResult = await client.assets 
      .upload("file", file, {
        filename: file.name,
        // contentType: fileType.mime,
      })
      .then((res) => {
        if (!res || !res._id || !res.originalFilename) {
          console.error("Upload failed: Missing expected response fields.");
          return NextResponse.json(
            {
              message: "File upload failed.",
              reason: "Sanity response did not contain required fields.",
              meta: {},
            },
            { status: 500 }
          );
        }

        // console.log('File uploaded successfully:', res);

        const [_type, assetId, ext] = res._id.split("-");
        const fileUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${assetId}.${ext}`;

        return NextResponse.json({
          ok: true,
          message: "File uploaded successfully.",
          meta: {
            fileId: res._id,
            fileName: res.originalFilename,
            previewPDF: fileUrl,
          },
        });
      })
      .catch((error) => {
        console.error("Error during file upload:", error);
        return NextResponse.json(
          {
            message: "File upload failed.",
            reason: error.message || "Unknown error occurred during upload.",
            meta: {},
          },
          { status: 500 }
        );
      });

    return sanityResult;

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
