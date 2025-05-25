import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { Metadata } from "next";
import { Award, Clock, Users, Printer } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Ganpathi Overseas",
  description:
    "Learn about Ganpathi Overseas, Lucknow's premier printing service provider with over 25 years of experience.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Better Spacing */}
      <div className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              About Ganpathi Overseas
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Lucknow's premier printing service provider with over 25 years of
              experience delivering exceptional quality and innovation.
            </p>
            <div className="flex items-center justify-center mt-8 space-x-8 text-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section with Better Spacing */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  Our Story
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mb-8"></div>
              </div>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 1998, Ganpathi Overseas began as a small
                  family-owned printing shop in the heart of Lucknow. What
                  started with a single offset printer has now grown into one of
                  the region's most respected printing companies.
                </p>
                <p>
                  Our journey has been defined by a commitment to quality,
                  innovation, and customer satisfaction. We've continuously
                  invested in the latest printing technologies while maintaining
                  the personal touch and attention to detail that set us apart.
                </p>
                <p>
                  Today, we serve clients across Uttar Pradesh and beyond,
                  providing comprehensive printing solutions for businesses of
                  all sizes. Our dedication to excellence has earned us a
                  reputation as a trusted partner for all printing needs.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/backgrounds/machine.jpg"
                  alt="Ganpathi Overseas printing facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">EST</div>
                  <div className="text-lg">1998</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Better Spacing */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and define who we are as a
              company.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-12 h-12" />,
                title: "Excellence",
                description:
                  "We strive for perfection in every print job, no matter the size or complexity.",
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: "Reliability",
                description:
                  "We deliver on our promises, meeting deadlines and exceeding expectations.",
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Customer Focus",
                description:
                  "We build lasting relationships through personalized service and attention to detail.",
              },
              {
                icon: <Printer className="w-12 h-12" />,
                title: "Innovation",
                description:
                  "We continuously invest in new technologies to offer cutting-edge printing solutions.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Better Spacing */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Our Leadership Team
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals leading Ganpathi Overseas to
              new heights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Onkar",
                position: "Founder & CEO",
                image: "/images/team/ceo.jpg",
                bio: "With over 30 years in the printing industry, Rajesh founded Ganpathi Overseas with a vision to provide premium printing services in Lucknow.",
              },
              {
                name: "Subodh Sharma",
                position: "Operations Director",
                image: "/images/team/amit_patel.avif",
                bio: "Priya oversees all production processes, ensuring efficient workflows and maintaining our high quality standards.",
              },
              {
                name: "Amit Patel",
                position: "Creative Director",
                image: "/images/team/Rajesh_gupta.avif",
                bio: "Amit leads our design team, bringing creative vision and innovative solutions to every client project.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {member.position}
                </p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
