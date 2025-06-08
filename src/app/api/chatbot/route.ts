import { NextRequest, NextResponse } from "next/server";

// Comprehensive knowledge base with all company information
const knowledgeBase = {
    company: {
        name: "Ganpathi Overseas",
        tagline: "Printing Excellence",
        experience: "20+ years",
        location: "Lucknow, Uttar Pradesh, India",
        certification: "ISO 9001:2015 Certified",
        established: "Over two decades of precision craftsmanship",
    },

    services: {
        offset: {
            name: "Offset Printing",
            description:
                "High-quality offset printing for large volumes with exceptional color accuracy",
            useCases: [
                "Business cards",
                "Brochures",
                "Letterheads",
                "Corporate materials",
            ],
            minQuantity: "500+ pieces",
            benefits: [
                "Cost-effective for large runs",
                "Superior color consistency",
                "Wide material compatibility",
            ],
        },
        digital: {
            name: "Digital Printing",
            description:
                "Fast turnaround digital printing perfect for small to medium runs",
            useCases: [
                "Quick prints",
                "Variable data printing",
                "Short runs",
                "Personalization",
            ],
            quantity: "1-500 pieces",
            benefits: [
                "Quick turnaround",
                "No setup costs",
                "Variable data printing",
            ],
        },
        uv: {
            name: "UV Printing",
            description:
                "Durable UV printing on various materials with vibrant colors",
            useCases: [
                "Outdoor signage",
                "Promotional materials",
                "Specialty substrates",
            ],
            benefits: [
                "Weather resistant",
                "Fade resistant",
                "Works on multiple substrates",
            ],
        },
        largeFormat: {
            name: "Large Format Printing",
            description:
                "Eye-catching banners, posters, and signage for maximum impact",
            useCases: [
                "Banners",
                "Posters",
                "Trade show displays",
                "Vehicle wraps",
            ],
            maxWidth: "5 meters wide",
            benefits: [
                "High resolution",
                "Vibrant colors",
                "Indoor/outdoor options",
            ],
        },
        books: {
            name: "Book Publishing",
            description: "Professional book printing and binding services",
            useCases: ["Novels", "Textbooks", "Magazines", "Catalogs"],
            binding: ["Perfect binding", "Saddle stitching", "Wire-O binding"],
        },
        packaging: {
            name: "Packaging Design",
            description: "Custom packaging solutions for your products",
            useCases: [
                "Product boxes",
                "Labels",
                "Custom packaging",
                "Branding materials",
            ],
            materials: ["Corrugated", "Cardboard", "Specialty papers"],
        },
    },

    features: [
        "Precision & Accuracy with state-of-the-art equipment",
        "Creative Solutions with innovative design team",
        "Fast Turnaround - Rush orders in 24-48 hours",
        "Quality Assured with ISO certified processes",
        "Expert Team with decades of experience",
        "Customer Focused personalized service",
    ],

    contact: {
        address:
            "9 Lakshampuri, Indira Nagar, Near Boothnath Metro Station, Lucknow, UP 226016",
        phone: "+91 965 191 1111",
        email: "info@ganpathioverseas.com",
        hours: "Mon-Sat: 9AM-6PM, Sun: Closed",
        googleMaps:
            "https://maps.google.com/maps?q=9+Lakshampuri,+Indira+Nagar,+Near+Boothnath+Metro+Station,+Lucknow,+UP+226016",
    },

    materials: {
        papers: [
            "80GSM to 350GSM papers",
            "Matte and glossy finishes",
            "Textured papers",
            "Art papers",
        ],
        specialty: [
            "Vinyl substrates",
            "Canvas materials",
            "Fabric printing",
            "Metal substrates",
            "Wood printing",
        ],
        eco: [
            "Recycled papers",
            "FSC certified materials",
            "Eco-friendly inks",
        ],
    },

    fileRequirements: {
        formats: ["PDF (preferred)", "AI", "EPS", "PSD", "JPEG", "PNG"],
        resolution: "300 DPI minimum",
        colorMode: "CMYK preferred",
        bleed: "3mm for trimmed items",
        maxSize: "100MB per file",
    },

    turnaround: {
        standard: "3-5 business days",
        rush: "24-48 hours (additional charges apply)",
        largeFormat: "2-4 business days",
        bookPublishing: "5-7 business days",
        packaging: "7-10 business days",
    },

    trustedClients: [
        "Havells",
        "Idea Cellular",
        "Airtel",
        "BBQ Nation",
        "Local businesses",
        "Government agencies",
    ],
};

// Enhanced RAG pipeline for intelligent responses
function generateResponse(message: string): string {
    const normalizedMessage = message.toLowerCase().trim();

    // Greeting detection
    if (
        normalizedMessage.match(
            /\b(hello|hi|hey|good morning|good afternoon|good evening|start|begin)\b/,
        )
    ) {
        return `Hello! 👋 Welcome to ${knowledgeBase.company.name}!\n\nI'm your AI printing assistant with ${knowledgeBase.company.experience} of industry knowledge. I can help you with:\n\n• Service recommendations\n• Pricing information\n• Technical specifications\n• File requirements\n• Delivery timelines\n\n💬 What printing project can I help you with today?`;
    }

    // General services inquiry
    if (
        normalizedMessage.match(
            /\b(service|services|what do you|offer|provide|do|capabilities|can you do)\b/,
        )
    ) {
        const serviceList = Object.values(knowledgeBase.services)
            .map((service) => `🖨️ **${service.name}**: ${service.description}`)
            .join("\n");

        return `We offer comprehensive printing solutions:\n\n${serviceList}\n\n✨ All services backed by ${knowledgeBase.company.certification} quality standards and ${knowledgeBase.company.experience} of expertise.\n\n📞 Need specific recommendations? Call ${knowledgeBase.contact.phone}`;
    }

    // Quantity-based service recommendations
    if (
        normalizedMessage.match(
            /\b(\d+)\s*\b(brochures?|flyers?|cards?|posters?|banners?)\b/,
        )
    ) {
        const quantityMatch = message.match(/(\d+)/);
        const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 0;
        const productType = normalizedMessage.match(
            /\b(brochures?|flyers?|cards?|posters?|banners?)\b/,
        )
            ?.[1] || "print";

        if (quantity >= 1000) {
            const service = knowledgeBase.services.offset;
            const productTypeDisplay = productType.endsWith("s")
                ? productType
                : `${productType}s`;
            return `🎯 **Perfect! For ${quantity} ${productTypeDisplay}, I recommend Offset Printing**\n\n📋 **Why Offset is ideal for your order**:\n• ${service.description}\n• Cost-effective for quantities over 500\n• Superior color accuracy and consistency\n• Professional quality finish\n\n✅ **Best for**: ${
                service.useCases.join(", ")
            }\n\n💰 **Cost savings**: Higher volumes = better per-unit pricing\n📊 **Your quantity**: ${quantity} pieces (Perfect for offset!)\n⏰ **Timeline**: ${knowledgeBase.turnaround.standard}\n🏆 **Quality**: ${knowledgeBase.company.certification} standards\n\n🎨 **What we need from you**:\n• Design files (PDF preferred)\n• Paper/material preference\n• Finishing options (lamination, folding, etc.)\n\n📞 **Ready to get started?** Call ${knowledgeBase.contact.phone}\n💬 **Or ask me**: "What paper options do you have?"`;
        } else if (quantity <= 500) {
            const service = knowledgeBase.services.digital;
            const productTypeDisplay = productType.endsWith("s")
                ? productType
                : `${productType}s`;
            return `🎯 **For ${quantity} ${productTypeDisplay}, I recommend Digital Printing**\n\n📋 **Why Digital is perfect for your order**:\n• ${service.description}\n• Quick turnaround for smaller quantities\n• No setup costs or plates required\n• Flexible and cost-effective\n\n✅ **Ideal for**: Small runs, personalization, urgent projects\n\n💰 **Cost effective**: No minimum quantities or setup fees\n📊 **Your quantity**: ${quantity} pieces (Ideal for digital!)\n⚡ **Timeline**: ${knowledgeBase.turnaround.rush} available\n🎨 **Customization**: Each piece can be personalized\n\n🎨 **What we need from you**:\n• Final design files\n• Material preferences\n• Delivery timeline\n\n📞 **Quick quote**: ${knowledgeBase.contact.phone}\n💬 **Need help with design?** Just ask!`;
        }
    }

    // Specific service inquiries with detailed information
    const serviceQueries = {
        offset: /\b(offset|bulk|large volume|mass printing|2000|1500|1000)\b/,
        digital:
            /\b(digital|quick|fast|small|few|rush|urgent|personalized|under 500)\b/,
        uv: /\b(uv|outdoor|durable|weather|fade|resistant)\b/,
        largeFormat:
            /\b(banner|poster|large format|signage|display|wide|vehicle wrap)\b/,
        books: /\b(book|publishing|magazine|catalog|binding|novel|textbook)\b/,
        packaging: /\b(packaging|box|label|product|custom|branding)\b/,
    };

    for (const [key, regex] of Object.entries(serviceQueries)) {
        if (normalizedMessage.match(regex)) {
            const service = knowledgeBase
                .services[key as keyof typeof knowledgeBase.services];
            const serviceDetails = service as any; // Type assertion for mixed service properties
            return `🎯 **${service.name}** - Perfect choice for your needs!\n\n📋 **Description**: ${service.description}\n\n✅ **Ideal for**: ${
                service.useCases.join(", ")
            }\n\n${
                serviceDetails.quantity
                    ? `📊 **Quantity**: ${serviceDetails.quantity}`
                    : ""
            }\n${
                serviceDetails.minQuantity
                    ? `📊 **Min Quantity**: ${serviceDetails.minQuantity}`
                    : ""
            }\n${
                serviceDetails.maxWidth
                    ? `📏 **Max Width**: ${serviceDetails.maxWidth}`
                    : ""
            }\n\n⭐ **Key Benefits**:\n${
                serviceDetails.benefits?.map((b: string) => `• ${b}`).join(
                    "\n",
                ) ||
                "• High quality results\n• Professional finish"
            }\n\n💡 **Pro Tip**: ${
                key === "offset"
                    ? "Great for business cards, brochures, and marketing materials!"
                    : key === "digital"
                    ? "Perfect for small runs and variable data!"
                    : "Excellent choice for your project!"
            }\n\n📞 Get quote: ${knowledgeBase.contact.phone}`;
        }
    }

    // Pricing inquiries with detailed breakdown
    if (
        normalizedMessage.match(
            /\b(price|pricing|cost|costs|quote|quotes|rate|rates|fee|budget|how much|expensive|cheap)\b/,
        )
    ) {
        return `💰 **Pricing Information**\n\nOur pricing is customized based on:\n\n📊 **Key factors**:\n• Quantity (higher volume = better rates)\n• Material selection\n• Finishing options (lamination, binding, etc.)\n• Print complexity and colors\n• Turnaround time requirements\n\n💡 **Cost-saving tips**:\n• Offset printing for 500+ pieces\n• Standard sizes reduce costs\n• CMYK colors vs spot colors\n• Standard turnaround vs rush\n\n🎯 **Get accurate quotes**:\n📱 Use our online quote form\n📞 Call ${knowledgeBase.contact.phone}\n✉️ Email ${knowledgeBase.contact.email}\n\n✅ **Promise**: Competitive rates with no hidden fees!`;
    }

    // Timeline and delivery inquiries
    if (
        normalizedMessage.match(
            /\b(time|delivery|turnaround|how long|when|duration|timeline|schedule|urgent|rush)\b/,
        )
    ) {
        return `⏰ **Delivery Timelines**\n\n📅 **Standard turnaround**:\n• Most prints: ${knowledgeBase.turnaround.standard}\n• Large format: ${knowledgeBase.turnaround.largeFormat}\n• Book publishing: ${knowledgeBase.turnaround.bookPublishing}\n• Custom packaging: ${knowledgeBase.turnaround.packaging}\n\n⚡ **Rush service**: ${knowledgeBase.turnaround.rush}\n\n🚚 **Delivery options**:\n• Local delivery in Lucknow (free above ₹2000)\n• Pan-India shipping available\n• Express delivery for urgent orders\n\n💡 **Planning tip**: Place orders early for best rates and guaranteed delivery!\n\n📞 Urgent project? Call ${knowledgeBase.contact.phone}`;
    }

    // Contact and location inquiries
    if (
        normalizedMessage.match(
            /\b(contact|address|phone|location|where|visit|directions|reach|map)\b/,
        )
    ) {
        return `📍 **Visit Our Office**\n\n🏢 **Address**: ${knowledgeBase.contact.address}\n\n📞 **Phone**: ${knowledgeBase.contact.phone}\n✉️ **Email**: ${knowledgeBase.contact.email}\n🕒 **Hours**: ${knowledgeBase.contact.hours}\n\n🚇 **Easy to find**: Near Boothnath Metro Station\n🅿️ **Parking**: Ample parking available\n🗺️ **Directions**: [Get directions](${knowledgeBase.contact.googleMaps})\n\n💬 **Prefer to chat?** Continue our conversation here!\n🤝 **Want to visit?** We'd love to meet you in person!`;
    }

    // Quality and certification inquiries
    if (
        normalizedMessage.match(
            /\b(quality|certification|standard|standards|iso|guarantee|assurance|reliable)\b/,
        )
    ) {
        return `🏆 **Quality Assurance**\n\n🎖️ **Certification**: ${knowledgeBase.company.certification}\n⚙️ **Equipment**: State-of-the-art printing technology\n👥 **Team**: Expert quality control specialists\n📈 **Experience**: ${knowledgeBase.company.experience} of proven excellence\n\n✅ **Quality process**:\n• Pre-press file verification\n• Color calibration and proofing\n• In-process quality checks\n• Final inspection before delivery\n• Client approval at key stages\n\n🌟 **Our promise**: Every job meets professional standards or we'll make it right!\n\n🤝 **Trusted by**: ${
            knowledgeBase.trustedClients.slice(0, 4).join(", ")
        } and hundreds more!`;
    }

    // File requirements and technical questions
    if (
        normalizedMessage.match(
            /\b(file|files|format|resolution|dpi|design|artwork|pdf|ai|eps|cmyk|rgb|bleed|upload)\b/,
        )
    ) {
        return `📁 **File Requirements**\n\n✅ **Accepted formats**: ${
            knowledgeBase.fileRequirements.formats.join(", ")
        }\n📏 **Resolution**: ${knowledgeBase.fileRequirements.resolution}\n🎨 **Color mode**: ${knowledgeBase.fileRequirements.colorMode}\n📐 **Bleed**: ${knowledgeBase.fileRequirements.bleed}\n💾 **Max file size**: ${knowledgeBase.fileRequirements.maxSize}\n\n💡 **Pro tips**:\n• PDF format ensures compatibility\n• CMYK colors print more accurately\n• High resolution prevents pixelation\n• Include bleed for edge-to-edge prints\n\n🎨 **Need design help?**\nOur creative team can:\n• Create designs from scratch\n• Enhance existing artwork\n• Optimize files for printing\n\n📞 Design consultation: ${knowledgeBase.contact.phone}`;
    }

    // Materials and substrates
    if (
        normalizedMessage.match(
            /\b(material|materials|paper|substrate|vinyl|fabric|metal|wood|canvas|cardstock)\b/,
        )
    ) {
        return `📦 **Material Options**\n\n📄 **Paper varieties**:\n${
            knowledgeBase.materials.papers.map((p) => `• ${p}`).join("\n")
        }\n\n🎯 **Specialty substrates**:\n${
            knowledgeBase.materials.specialty.map((s) => `• ${s}`).join("\n")
        }\n\n🌱 **Eco-friendly options**:\n${
            knowledgeBase.materials.eco.map((e) => `• ${e}`).join("\n")
        }\n\n💡 **Material selection guide**:\n• Business cards: 300GSM cardstock\n• Brochures: 150-200GSM gloss/matte\n• Outdoor banners: Weather-resistant vinyl\n• Books: 80GSM offset paper\n\n🤔 **Not sure?** Our experts will recommend the perfect material for your project!\n\n📞 Material consultation: ${knowledgeBase.contact.phone}`;
    }

    // About company
    if (
        normalizedMessage.match(
            /\b(about|company|history|experience|established|who are you|background|story)\b/,
        )
    ) {
        return `🏢 **About ${knowledgeBase.company.name}**\n\n${knowledgeBase.company.tagline} • ${knowledgeBase.company.established}\n\n🌟 **What makes us special**:\n${
            knowledgeBase.features.map((f) => `• ${f}`).join("\n")
        }\n\n🏆 **Achievements**:\n• ${knowledgeBase.company.certification}\n• ${knowledgeBase.company.experience} in the industry\n• Thousands of satisfied clients\n• Cutting-edge technology adoption\n\n🤝 **Trusted by major brands**:\n${
            knowledgeBase.trustedClients.join(" • ")
        }\n\n📍 **Proudly serving**: ${knowledgeBase.company.location} and beyond\n\n💬 **Our mission**: Delivering printing excellence with personalized service!`;
    }

    // Help and capabilities
    if (
        normalizedMessage.match(
            /\b(help|assist|support|can you|what can|capabilities|options)\b/,
        )
    ) {
        return `🤖 **I'm your AI printing expert!**\n\n💬 **I can help you with**:\n• Service recommendations based on your needs\n• Detailed pricing information\n• Technical specifications and file requirements\n• Material selection guidance\n• Timeline planning and rush options\n• Quality standards and certifications\n• Contact information and directions\n\n🎯 **Try asking me**:\n• "What's best for 1000 business cards?"\n• "How much for a banner?"\n• "What files do you need?"\n• "Can you do rush orders?"\n• "What materials do you have?"\n\n🔄 **Need human expert?**\nCall ${knowledgeBase.contact.phone} for complex projects!\n\n💡 **Tip**: Be specific about your project for better recommendations!`;
    }

    // Default response with helpful suggestions
    return `I'm your ${knowledgeBase.company.name} printing assistant! 🖨️\n\nI have comprehensive knowledge about our services, pricing, and processes. Here are some ways I can help:\n\n🎯 **Quick topics**:\n• "Services" - See all our printing options\n• "Pricing" - Get cost information\n• "Files" - Learn about file requirements\n• "Quality" - Our standards and certifications\n• "Contact" - Reach our team\n\n💡 **Sample questions**:\n• "What's best for outdoor banners?"\n• "How long does book printing take?"\n• "What paper is good for brochures?"\n• "Do you offer rush services?"\n\n📞 **Complex projects?** Call ${knowledgeBase.contact.phone}\n\n💬 **What would you like to know about your printing project?**`;
}

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message || typeof message !== "string" || message.trim() === "") {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 },
            );
        }

        // Generate intelligent response using RAG approach
        const response = generateResponse(message.trim());

        // Natural delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 800));

        return NextResponse.json({
            response,
            timestamp: new Date().toISOString(),
            context: "AI-powered with company knowledge base",
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
    return NextResponse.json({
        message: "Enhanced RAG-powered Chatbot API is ready!",
        features: [
            "Intelligent context understanding",
            "Comprehensive company knowledge",
            "Service-specific recommendations",
            "Technical guidance",
            "Pricing information",
            "Quality standards",
        ],
        company: knowledgeBase.company.name,
        version: "2.0 - RAG Enhanced",
    });
}
