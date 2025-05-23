import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { Award, Clock, Users, Printer } from "lucide-react";

export default function AboutPageStoryboard() {
  const values = [
    {
      icon: <Award className="w-10 h-10" />,
      title: "Excellence",
      description:
        "We strive for perfection in every print job, no matter the size or complexity.",
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Reliability",
      description:
        "We deliver on our promises, meeting deadlines and exceeding expectations.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Customer Focus",
      description:
        "We build lasting relationships through personalized service and attention to detail.",
    },
    {
      icon: <Printer className="w-10 h-10" />,
      title: "Innovation",
      description:
        "We continuously invest in new technologies to offer cutting-edge printing solutions.",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
      bio: "With over 30 years in the printing industry, Rajesh founded Ganpathi Overseas with a vision to provide premium printing services.",
    },
    {
      name: "Priya Sharma",
      position: "Operations Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      bio: "Priya oversees all production processes, ensuring efficient workflows and maintaining our high quality standards.",
    },
    {
      name: "Amit Patel",
      position: "Creative Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
      bio: "Amit leads our design team, bringing creative vision and innovative solutions to every client project.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Ganpathi Overseas
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Lucknow's premier printing service provider with over 25 years of
            experience delivering exceptional quality.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 1998, Ganpathi Overseas began as a small family-owned
                printing shop in the heart of Lucknow. What started with a
                single offset printer has now grown into one of the region's
                most respected printing companies.
              </p>
              <p className="text-gray-600">
                Our journey has been defined by a commitment to quality,
                innovation, and customer satisfaction. We've continuously
                invested in the latest printing technologies while maintaining
                the personal touch that sets us apart.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80"
                alt="Ganpathi Overseas printing facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="text-yellow-500 mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-900 mb-4">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
