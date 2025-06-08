import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const { name, email, company, service, description } = body;

        if (!name || !email || !service || !description) {
            return NextResponse.json(
                { error: "Name, email, service, and description are required" },
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

        // Insert quote request into database
        const { data, error } = await supabase
            .from("quote_requests")
            .insert([
                {
                    name: body.name,
                    email: body.email,
                    phone: body.phone || null,
                    company: body.company || null,
                    service: body.service,
                    description: body.description,
                    quantity: body.quantity || null,
                    dimensions: body.dimensions || null,
                    materials: body.materials || null,
                    deadline: body.deadline || null,
                    budget: body.budget || null,
                    additional_notes: body.additionalNotes || null,
                    status: "new",
                    created_at: new Date().toISOString(),
                },
            ])
            .select();

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to save quote request. Please try again." },
                { status: 500 },
            );
        }

        // Log the quote request for debugging
        console.log("New quote request received:", data);

        // Success response
        return NextResponse.json(
            {
                success: true,
                message:
                    "Your quote request has been submitted successfully. We'll prepare a detailed quote and send it to you within 24 hours.",
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
        { message: "Quote API is working. Use POST to submit quote requests." },
        { status: 200 },
    );
}
