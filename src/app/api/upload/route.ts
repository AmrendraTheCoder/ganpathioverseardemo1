import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const UPLOAD_DIR = join(process.cwd(), "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
];

export async function POST(request: NextRequest) {
    try {
        // Ensure upload directory exists
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }

        const formData = await request.formData();
        const files = formData.getAll("files") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: "No files uploaded" },
                { status: 400 },
            );
        }

        const uploadedFiles = [];

        for (const file of files) {
            // Validate file type
            if (!ALLOWED_TYPES.includes(file.type)) {
                return NextResponse.json(
                    { error: `File type ${file.type} is not allowed` },
                    { status: 400 },
                );
            }

            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    {
                        error:
                            `File ${file.name} is too large. Maximum size is 10MB`,
                    },
                    { status: 400 },
                );
            }

            // Generate unique filename
            const timestamp = Date.now();
            const randomId = Math.random().toString(36).substring(2);
            const extension = file.name.split(".").pop();
            const uniqueFilename = `${timestamp}-${randomId}.${extension}`;

            // Convert file to buffer and save
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = join(UPLOAD_DIR, uniqueFilename);

            await writeFile(filePath, buffer);

            uploadedFiles.push({
                originalName: file.name,
                filename: uniqueFilename,
                size: file.size,
                type: file.type,
                url: `/api/files/${uniqueFilename}`,
            });
        }

        return NextResponse.json({
            success: true,
            files: uploadedFiles,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload files" },
            { status: 500 },
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 },
    );
}
