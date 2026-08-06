import { NextResponse } from "next/server";

import { adminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("images") as File[];

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileName = `${crypto.randomUUID()}-${file.name}`;

      const { error } = await adminClient.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
          },
          {
            status: 400,
          }
        );
      }

      const publicUrl = adminClient.storage
        .from("product-images")
        .getPublicUrl(fileName)
        .data.publicUrl;

      uploadedUrls.push(publicUrl);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}