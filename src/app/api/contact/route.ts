import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const { name, email, message, subject } = body;

        if (!name || !email || !message || !subject) {
            return NextResponse.json(
                { error: "Name, email, subject, and message are required" },
                { status: 400 },
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address" },
                { status: 400 },
            );
        }

        const supabase = createClient();

        // Insert contact inquiry into database
        const { data, error } = await supabase
            .from("contact_inquiries")
            .insert([
                {
                    name: body.name,
                    email: body.email,
                    phone: body.phone || null,
                    subject: body.subject,
                    message: body.message,
                    service_type: body.service || null,
                    urgency: body.urgency || "normal",
                    status: "new",
                    created_at: new Date().toISOString(),
                },
            ])
            .select();

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to save inquiry. Please try again." },
                { status: 500 },
            );
        }

        // Log the inquiry for debugging
        console.log("New contact inquiry received:", data);

        // Success response
        return NextResponse.json(
            {
                success: true,
                message:
                    "Your inquiry has been submitted successfully. We'll get back to you within 2 hours during business hours.",
                data: data,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 },
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: "Contact API is working. Use POST to submit inquiries." },
        { status: 200 },
    );
}
