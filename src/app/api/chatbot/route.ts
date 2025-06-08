import { NextRequest, NextResponse } from "next/server";

// Predefined chatbot responses for common printing queries
const responses = {
    greeting: [
        "Hello! I'm here to help you with your printing needs. What can I assist you with today?",
        "Hi there! Welcome to Ganpathi Overseas. How can I help you with your printing project?",
        "Welcome! I'm your printing assistant. What printing service are you interested in?",
    ],
    services: {
        offset:
            "Our offset printing service is perfect for large volume orders (500+ pieces). We offer exceptional color accuracy and cost-effective pricing for brochures, catalogs, and marketing materials.",
        digital:
            "Digital printing is ideal for small to medium runs (1-500 pieces) with quick turnaround times. Perfect for business cards, flyers, and personalized materials.",
        uv: "UV printing provides durable, weather-resistant prints with vibrant colors. Great for outdoor banners, signage, and materials that need extra protection.",
        large:
            "Large format printing covers banners, posters, vehicle wraps, and trade show displays. We can print up to 5 meters wide with high-resolution quality.",
    },
    pricing:
        "Our pricing depends on quantity, materials, and finishing options. For accurate quotes, please use our quote form or call +91 965 191 1111. We offer competitive rates with no hidden fees.",
    turnaround:
        "Standard turnaround time is 3-5 business days. We also offer rush services (24-48 hours) for urgent projects with additional charges.",
    materials:
        "We work with various materials including matte/glossy paper, cardstock, canvas, vinyl, fabric, and specialty papers. Material recommendations depend on your specific project needs.",
    delivery:
        "We provide delivery services within Lucknow and shipping across India. Local delivery is usually free for orders above ₹2000.",
    quality:
        "We maintain ISO quality standards with regular calibration of our equipment. All prints go through quality checks before dispatch.",
    files:
        "We accept PDF, AI, PSD, INDD, and most image formats. PDF is preferred. Files should be in CMYK color mode with 300 DPI resolution for best results.",
    contact:
        "You can reach us at +91 965 191 1111 or email info@ganpathioverseas.com. We're open Mon-Fri 9 AM-6 PM, Sat 10 AM-4 PM.",
    default:
        "I'm here to help with printing questions. You can ask about our services, pricing, turnaround times, or file requirements. For complex queries, I'd recommend speaking with our experts at +91 965 191 1111.",
};

function getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
}

function processMessage(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Greeting patterns
    if (
        lowerMessage.match(
            /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/,
        )
    ) {
        return getRandomResponse(responses.greeting);
    }

    // Service inquiries
    if (lowerMessage.match(/\b(offset|offset printing)\b/)) {
        return responses.services.offset;
    }

    if (lowerMessage.match(/\b(digital|digital printing)\b/)) {
        return responses.services.digital;
    }

    if (lowerMessage.match(/\b(uv|uv printing)\b/)) {
        return responses.services.uv;
    }

    if (lowerMessage.match(/\b(large format|banner|poster|signage)\b/)) {
        return responses.services.large;
    }

    // Pricing inquiries
    if (lowerMessage.match(/\b(price|pricing|cost|rate|quote|how much)\b/)) {
        return responses.pricing;
    }

    // Turnaround time
    if (
        lowerMessage.match(
            /\b(time|turnaround|delivery|when|how long|rush|urgent)\b/,
        )
    ) {
        return responses.turnaround;
    }

    // Materials
    if (
        lowerMessage.match(/\b(material|paper|quality|type|cardstock|canvas)\b/)
    ) {
        return responses.materials;
    }

    // File requirements
    if (
        lowerMessage.match(/\b(file|format|pdf|resolution|dpi|cmyk|upload)\b/)
    ) {
        return responses.files;
    }

    // Contact info
    if (lowerMessage.match(/\b(contact|phone|call|email|address|location)\b/)) {
        return responses.contact;
    }

    // Quality
    if (lowerMessage.match(/\b(quality|standard|iso|guarantee)\b/)) {
        return responses.quality;
    }

    return responses.default;
}

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 },
            );
        }

        // Process the message and get response
        const response = processMessage(message.trim());

        // Simulate a brief delay to make it feel more natural
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({
            response,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Chatbot API error:", error);
        return NextResponse.json(
            { error: "Failed to process message" },
            { status: 500 },
        );
    }
}

export async function GET() {
    return NextResponse.json(
        {
            message: "Chatbot API is working. Use POST to send messages.",
            availableTopics: [
                "services",
                "pricing",
                "turnaround",
                "materials",
                "files",
                "contact",
                "quality",
            ],
        },
        { status: 200 },
    );
}
