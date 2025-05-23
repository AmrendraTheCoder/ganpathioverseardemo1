"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Printer,
  BookOpen,
  Phone,
  Palette,
  PenTool,
  Image as ImageIcon,
  Maximize2,
  Clock,
  Award,
} from "lucide-react";

export function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
            Our Premium Printing Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ganpathi Overseas offers a comprehensive range of high-quality
            printing solutions tailored to your specific needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Printer className="w-6 h-6" />,
              title: "Offset Printing",
              description:
                "Traditional printing method delivering exceptional quality for large volume projects with precise color reproduction.",
              gradient: "from-blue-500 to-blue-600",
            },
            {
              icon: <Palette className="w-6 h-6" />,
              title: "UV Printing",
              description:
                "Advanced UV technology for vibrant colors and durability on various materials including plastic, metal, and glass.",
              gradient: "from-purple-500 to-purple-600",
            },
            {
              icon: <PenTool className="w-6 h-6" />,
              title: "Digital Printing",
              description:
                "Fast turnaround for short-run projects with customization options and consistent quality.",
              gradient: "from-green-500 to-green-600",
            },
            {
              icon: <ImageIcon className="w-6 h-6" />,
              title: "Large Format",
              description:
                "Eye-catching banners, posters, and signage that make a big impression for your business.",
              gradient: "from-orange-500 to-orange-600",
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              title: "Book Publishing",
              description:
                "Complete book printing and binding services with premium paper options and finishing touches.",
              gradient: "from-red-500 to-red-600",
            },
            {
              icon: <Maximize2 className="w-6 h-6" />,
              title: "Packaging Solutions",
              description:
                "Custom packaging design and printing that enhances your product presentation and brand identity.",
              gradient: "from-teal-500 to-teal-600",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div
                className={`text-white mb-6 bg-gradient-to-br ${service.gradient} p-4 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-900 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Hover effect border */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient} w-0 group-hover:w-full transition-all duration-500`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComparisonSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">See The Difference</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the superior quality of our printing techniques with
            these before and after comparisons.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80"
                alt="Before printing enhancement"
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-md">
                Before
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80"
                alt="After printing enhancement"
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-md">
                After
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold mb-2">25+</div>
            <div className="text-blue-100">Years Experience</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold mb-2">5000+</div>
            <div className="text-blue-100">Projects Completed</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold mb-2">1200+</div>
            <div className="text-blue-100">Happy Clients</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-blue-100">Industry Awards</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Ganpathi Overseas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We combine traditional craftsmanship with modern technology to
            deliver exceptional printing solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Award className="w-6 h-6" />,
              title: "Premium Quality",
              description:
                "We use top-grade materials and advanced techniques to ensure superior print quality every time.",
            },
            {
              icon: <Clock className="w-6 h-6" />,
              title: "Fast Turnaround",
              description:
                "Meet tight deadlines with our efficient production process and quick delivery options.",
            },
            {
              icon: <CheckCircle2 className="w-6 h-6" />,
              title: "Attention to Detail",
              description:
                "Our expert team ensures every print job meets exacting standards with meticulous quality control.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Printing Project?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact us today for a free consultation and quote. Our experts are
          ready to help bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Request a Quote
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
          <a
            href="tel:+911234567890"
            className="inline-flex items-center px-6 py-3 text-blue-900 bg-white border border-blue-900 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Phone className="mr-2 w-4 h-4" />
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
