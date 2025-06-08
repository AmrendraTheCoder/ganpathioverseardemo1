import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const UPLOAD_DIR = join(process.cwd(), "uploads");

export async function GET(
    request: NextRequest,
    { params }: { params: { filename: string } },
) {
    try {
        const { filename } = params;

        // Basic security check - only allow alphanumeric, dots, and hyphens
        if (!/^[a-zA-Z0-9.-]+$/.test(filename)) {
            return NextResponse.json(
                { error: "Invalid filename" },
                { status: 400 },
            );
        }

        const filePath = join(UPLOAD_DIR, filename);

        if (!existsSync(filePath)) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 },
            );
        }

        const fileBuffer = await readFile(filePath);

        // Determine content type based on file extension
        const extension = filename.split(".").pop()?.toLowerCase();
        let contentType = "application/octet-stream";

        switch (extension) {
            case "jpg":
            case "jpeg":
                contentType = "image/jpeg";
                break;
            case "png":
                contentType = "image/png";
                break;
            case "gif":
                contentType = "image/gif";
                break;
            case "webp":
                contentType = "image/webp";
                break;
            case "pdf":
                contentType = "application/pdf";
                break;
            case "doc":
                contentType = "application/msword";
                break;
            case "docx":
                contentType =
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                break;
            case "txt":
                contentType = "text/plain";
                break;
        }

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `inline; filename="${filename}"`,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("File serve error:", error);
        return NextResponse.json(
            { error: "Failed to serve file" },
            { status: 500 },
        );
    }
}
