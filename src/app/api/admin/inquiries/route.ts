import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/client";

export async function GET() {
    try {
        const supabase = createClient();

        // Get all contact inquiries
        const { data: inquiries, error } = await supabase
            .from("contact_inquiries")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to fetch inquiries" },
                { status: 500 },
            );
        }

        return NextResponse.json({
            success: true,
            data: inquiries || [],
        });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { id, status, response } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Inquiry ID is required" },
                { status: 400 },
            );
        }

        const supabase = createClient();

        // Update inquiry status
        const updateData: any = {
            updated_at: new Date().toISOString(),
        };

        if (status) updateData.status = status;
        if (response) updateData.response = response;

        const { error } = await supabase
            .from("contact_inquiries")
            .update(updateData)
            .eq("id", id);

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to update inquiry" },
                { status: 500 },
            );
        }

        return NextResponse.json({
            success: true,
            message: "Inquiry updated successfully",
        });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
