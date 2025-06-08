"use client";

import Link from "next/link";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  Lock,
  Eye,
  UserCheck,
  Clock,
  FileText,
  Download,
  AlertCircle,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-200 mb-6">
              Your privacy is important to us. Learn how we collect, use, and
              protect your information.
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-200">
              <Calendar className="w-5 h-5" />
              <span>Last updated: June 15, 205</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex lg:gap-8">
          {/* Side Navigation */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Navigation
                </h2>
                <nav className="space-y-2">
                  <a
                    href="#information-collection"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    1. Information We Collect
                  </a>
                  <a
                    href="#use-information"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    2. How We Use Information
                  </a>
                  <a
                    href="#sharing-information"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    3. Information Sharing
                  </a>
                  <a
                    href="#data-security"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    4. Data Security
                  </a>
                  <a
                    href="#cookies"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    5. Cookies & Tracking
                  </a>
                  <a
                    href="#user-rights"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    6. Your Rights
                  </a>
                  <a
                    href="#third-parties"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    7. Third-Party Services
                  </a>
                  <a
                    href="#international-transfers"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    8. International Transfers
                  </a>
                  <a
                    href="#data-retention"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    9. Data Retention
                  </a>
                  <a
                    href="#children-privacy"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    10. Children's Privacy
                  </a>
                  <a
                    href="#policy-changes"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    11. Policy Changes
                  </a>
                  <a
                    href="#contact"
                    className="block py-2 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    12. Contact Information
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl pl-8">
            {/* Mobile Navigation */}
            <div className="lg:hidden bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Quick Navigation
              </h2>
              <div className="grid md:grid-cols-2 gap-2">
                <a
                  href="#information-collection"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  1. Information We Collect
                </a>
                <a
                  href="#use-information"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  2. How We Use Information
                </a>
                <a
                  href="#sharing-information"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  3. Information Sharing
                </a>
                <a
                  href="#data-security"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  4. Data Security
                </a>
                <a
                  href="#cookies"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  5. Cookies & Tracking
                </a>
                <a
                  href="#user-rights"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  6. Your Rights
                </a>
                <a
                  href="#third-parties"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  7. Third-Party Services
                </a>
                <a
                  href="#international-transfers"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  8. International Transfers
                </a>
                <a
                  href="#data-retention"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  9. Data Retention
                </a>
                <a
                  href="#children-privacy"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  10. Children's Privacy
                </a>
                <a
                  href="#policy-changes"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  11. Policy Changes
                </a>
                <a
                  href="#contact"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  12. Contact Information
                </a>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <Shield className="w-8 h-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ganpathi Overseas ("we," "our," or "us") is committed to
                    protecting your privacy and personal information. This
                    Privacy Policy explains how we collect, use, disclose, and
                    safeguard your information when you visit our website, use
                    our printing services, or interact with us in any capacity.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    As a leading printing services provider in Lucknow with over
                    20 years of experience, we understand the importance of
                    maintaining the confidentiality of your personal and
                    business information. This policy applies to all our
                    services including offset printing, digital printing, UV
                    printing, large format printing, packaging solutions, and
                    related services.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <p className="text-blue-800 font-medium">
                      By using our services or website, you agree to the
                      collection and use of information in accordance with this
                      policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Collection */}
            <div
              id="information-collection"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-blue-600" />
                1. Information We Collect
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Personal Information
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We may collect the following personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>
                      Name, email address, phone number, and mailing address
                    </li>
                    <li>Company name, job title, and business information</li>
                    <li>
                      Payment information (credit card details, billing address)
                    </li>
                    <li>Project specifications and print job requirements</li>
                    <li>Communication preferences and marketing consent</li>
                    <li>Account credentials for our online services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Print Job Information
                  </h3>
                  <p className="text-gray-700 mb-3">
                    When you submit printing projects, we collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Digital files, artwork, and design materials</li>
                    <li>
                      Print specifications (quantity, size, paper type,
                      finishing options)
                    </li>
                    <li>Delivery instructions and timelines</li>
                    <li>Special requirements or custom requests</li>
                    <li>Project notes and communication history</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Technical Information
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We automatically collect certain technical information:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>IP address, browser type, and operating system</li>
                    <li>Device information and screen resolution</li>
                    <li>Website usage patterns and navigation data</li>
                    <li>Referral sources and search terms</li>
                    <li>Session duration and page views</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div
              id="use-information"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <UserCheck className="w-6 h-6 mr-3 text-blue-600" />
                2. How We Use Your Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Service Delivery
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Process and fulfill your printing orders</li>
                    <li>
                      Communicate about project status and delivery updates
                    </li>
                    <li>Provide customer support and technical assistance</li>
                    <li>Handle billing, payments, and account management</li>
                    <li>Maintain quality control and resolve issues</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Business Operations
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Improve our services and develop new offerings</li>
                    <li>Conduct market research and analytics</li>
                    <li>Maintain and improve our website functionality</li>
                    <li>Ensure security and prevent fraud</li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Marketing and Communication
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>
                      Send promotional materials and special offers (with
                      consent)
                    </li>
                    <li>Provide newsletters and industry insights</li>
                    <li>Conduct customer satisfaction surveys</li>
                    <li>Invite participation in events or webinars</li>
                    <li>Share relevant product updates and announcements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div
              id="sharing-information"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                3. Information Sharing and Disclosure
              </h2>

              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
                  <p className="text-yellow-800 font-medium">
                    We do not sell, trade, or rent your personal information to
                    third parties for marketing purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Authorized Sharing
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We may share your information in the following
                    circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>
                      <strong>Service Providers:</strong> Trusted partners who
                      assist in operations (shipping, payment processing, IT
                      support)
                    </li>
                    <li>
                      <strong>Business Partners:</strong> Authorized
                      distributors or suppliers when necessary for order
                      fulfillment
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law,
                      court order, or government investigation
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In case of merger,
                      acquisition, or sale of business assets
                    </li>
                    <li>
                      <strong>Protection:</strong> To protect our rights,
                      property, or safety, or that of others
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Client Confidentiality
                  </h3>
                  <p className="text-gray-700">
                    We maintain strict confidentiality regarding your print
                    projects. We do not share project details, artwork, or
                    business information with unauthorized parties. All
                    employees and contractors sign confidentiality agreements to
                    protect your sensitive information.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div
              id="data-security"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lock className="w-6 h-6 mr-3 text-blue-600" />
                4. Data Security
              </h2>

              <div className="space-y-6">
                <p className="text-gray-700">
                  We implement comprehensive security measures to protect your
                  personal information and print files:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Technical Safeguards
                    </h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>SSL/TLS encryption for data transmission</li>
                      <li>Secure server infrastructure with firewalls</li>
                      <li>Regular security audits and updates</li>
                      <li>Access controls and authentication systems</li>
                      <li>Encrypted file storage and backup systems</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Physical Security
                    </h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Secure facilities with controlled access</li>
                      <li>CCTV monitoring and alarm systems</li>
                      <li>Locked file cabinets for physical documents</li>
                      <li>Clean desk policy and secure disposal</li>
                      <li>Background checks for employees</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-1 mr-2" />
                    <div>
                      <p className="text-red-800 font-medium mb-2">
                        Data Breach Notification
                      </p>
                      <p className="text-red-700">
                        In the unlikely event of a data breach that may affect
                        your personal information, we will notify you within 72
                        hours and provide details about the incident and steps
                        being taken to address it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies & Tracking */}
            <div
              id="cookies"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                5. Cookies and Tracking Technologies
              </h2>

              <div className="space-y-6">
                <p className="text-gray-700">
                  We use cookies and similar technologies to enhance your
                  browsing experience and analyze website usage.
                </p>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Types of Cookies We Use
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Essential Cookies
                      </h4>
                      <p className="text-gray-700">
                        Required for website functionality, user authentication,
                        and security.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Performance Cookies
                      </h4>
                      <p className="text-gray-700">
                        Help us analyze website performance and user behavior to
                        improve our services.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Marketing Cookies
                      </h4>
                      <p className="text-gray-700">
                        Used to deliver relevant advertisements and track
                        marketing campaign effectiveness.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Managing Cookies
                  </h3>
                  <p className="text-gray-700 mb-3">
                    You can control cookies through your browser settings. Note
                    that disabling certain cookies may affect website
                    functionality. You can:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Accept or reject all cookies</li>
                    <li>Set preferences for specific types of cookies</li>
                    <li>Delete existing cookies from your device</li>
                    <li>Receive notifications when cookies are set</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Rights */}
            <div
              id="user-rights"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                6. Your Privacy Rights
              </h2>

              <div className="space-y-6">
                <p className="text-gray-700">
                  You have several rights regarding your personal information.
                  These may vary based on your location and applicable privacy
                  laws.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Access Rights
                      </h3>
                      <p className="text-blue-800">
                        Request a copy of the personal information we hold about
                        you.
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-900 mb-2">
                        Correction Rights
                      </h3>
                      <p className="text-green-800">
                        Request corrections to inaccurate or incomplete
                        information.
                      </p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-900 mb-2">
                        Deletion Rights
                      </h3>
                      <p className="text-yellow-800">
                        Request deletion of your personal information (with
                        limitations).
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-900 mb-2">
                        Portability Rights
                      </h3>
                      <p className="text-purple-800">
                        Request your data in a portable, machine-readable
                        format.
                      </p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-900 mb-2">
                        Opt-out Rights
                      </h3>
                      <p className="text-red-800">
                        Withdraw consent for marketing communications or data
                        processing.
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Restriction Rights
                      </h3>
                      <p className="text-gray-800">
                        Request limitation of processing in certain
                        circumstances.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-blue-800">
                    To exercise any of these rights, please contact us using the
                    information provided in the "Contact Information" section
                    below. We will respond to your request within 30 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Third-Party Services */}
            <div
              id="third-parties"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                7. Third-Party Services and Links
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Services We Use
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We may use third-party services to enhance our operations.
                    These services have their own privacy policies:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>
                      <strong>Payment Processors:</strong> Secure payment
                      gateways for transaction processing
                    </li>
                    <li>
                      <strong>Shipping Partners:</strong> Delivery services for
                      order fulfillment
                    </li>
                    <li>
                      <strong>Analytics Tools:</strong> Website performance and
                      user behavior analysis
                    </li>
                    <li>
                      <strong>Email Services:</strong> Communication and
                      newsletter platforms
                    </li>
                    <li>
                      <strong>Cloud Storage:</strong> Secure file storage and
                      backup services
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">External Links</h3>
                  <p className="text-gray-700">
                    Our website may contain links to external websites. We are
                    not responsible for the privacy practices of these
                    third-party sites. We encourage you to review their privacy
                    policies before providing any personal information.
                  </p>
                </div>
              </div>
            </div>

            {/* International Transfers */}
            <div
              id="international-transfers"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                8. International Data Transfers
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700">
                  As a business operating primarily in India, most of your
                  personal information is stored and processed within India.
                  However, some of our service providers may be located in other
                  countries.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Data Protection Standards
                  </h3>
                  <p className="text-gray-700">
                    When we transfer data internationally, we ensure adequate
                    protection through:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                    <li>Adequacy decisions and approved transfer mechanisms</li>
                    <li>Standard contractual clauses with service providers</li>
                    <li>Certification schemes and codes of conduct</li>
                    <li>Regular audits and compliance assessments</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div
              id="data-retention"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-blue-600" />
                9. Data Retention
              </h2>

              <div className="space-y-6">
                <p className="text-gray-700">
                  We retain your personal information only as long as necessary
                  to fulfill the purposes outlined in this privacy policy,
                  unless a longer retention period is required by law.
                </p>

                <div className="grid gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Customer Information
                    </h3>
                    <p className="text-gray-700">
                      Retained for 7 years after last transaction for business
                      and tax purposes.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Print Files
                    </h3>
                    <p className="text-gray-700">
                      Stored for 90 days after order completion, then securely
                      deleted unless requested otherwise.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Website Analytics
                    </h3>
                    <p className="text-gray-700">
                      Aggregated data retained for 26 months for business
                      analysis purposes.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Marketing Data
                    </h3>
                    <p className="text-gray-700">
                      Retained until you opt-out or withdraw consent, then
                      deleted within 30 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Children's Privacy */}
            <div
              id="children-privacy"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                10. Children's Privacy
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Our services are not directed to children under the age of 13.
                  We do not knowingly collect personal information from children
                  under 13 without parental consent.
                </p>

                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                  <p className="text-orange-800">
                    If you are a parent or guardian and believe your child has
                    provided us with personal information, please contact us
                    immediately. We will delete such information from our
                    records promptly.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy Changes */}
            <div
              id="policy-changes"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                11. Changes to This Privacy Policy
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technology, legal requirements, or
                  other factors.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Notification of Changes
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-blue-800">
                    <li>
                      Major changes: 30-day advance notice via email and website
                      banner
                    </li>
                    <li>
                      Minor updates: Notice on our website and updated "Last
                      Modified" date
                    </li>
                    <li>
                      Material changes affecting your rights: Explicit consent
                      may be required
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700">
                  We encourage you to review this Privacy Policy periodically to
                  stay informed about how we protect your information.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div
              id="contact"
              className="bg-white rounded-lg shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                12. Contact Information
              </h2>

              <div className="space-y-6">
                <p className="text-gray-700">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our privacy practices, please contact
                  us:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Address</h3>
                        <p className="text-gray-700">
                          9 Lakshampuri, Indira Nagar
                          <br />
                          Near Boothnath Metro Station
                          <br />
                          Lucknow, UP 226016, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Phone</h3>
                        <p className="text-gray-700">+91 965 191 1111</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-700">
                          privacy@ganpathioverseas.com
                        </p>
                        <p className="text-gray-700">
                          info@ganpathioverseas.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Business Hours
                        </h3>
                        <p className="text-gray-700">
                          Monday - Saturday: 9:00 AM - 6:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <h3 className="font-semibold text-green-900 mb-2">
                    Response Time
                  </h3>
                  <p className="text-green-800">
                    We are committed to responding to all privacy-related
                    inquiries within 48 hours during business days. For urgent
                    matters, please call us directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Download Option */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold mb-3 flex items-center justify-center">
                <Download className="w-5 h-5 mr-2 text-blue-600" />
                Download This Policy
              </h3>
              <p className="text-gray-600 mb-4">
                Download a PDF copy of our Privacy Policy for your records
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Download PDF
              </button>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
