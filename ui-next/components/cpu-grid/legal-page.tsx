"use client"

import { ArrowLeft, Cpu } from "lucide-react"
import { useRouter } from "next/navigation"

interface LegalPageProps {
  type: "privacy" | "terms" | "cookies"
}

const legalContent = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "December 15, 2024",
    sections: [
      {
        title: "Information We Collect",
        content:
          "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes your name, email address, institution, and usage data related to your simulations.",
      },
      {
        title: "How We Use Your Information",
        content:
          "We use the information we collect to provide, maintain, and improve our services, to process your requests and transactions, and to send you technical notices and support messages.",
      },
      {
        title: "Information Sharing",
        content:
          "We do not share your personal information with third parties except as described in this policy. We may share aggregated, anonymized data for research purposes.",
      },
      {
        title: "Data Security",
        content:
          "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      },
      {
        title: "Your Rights",
        content:
          "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    lastUpdated: "December 15, 2024",
    sections: [
      {
        title: "Acceptance of Terms",
        content:
          "By accessing or using CPU Grid, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      },
      {
        title: "Use of Services",
        content:
          "CPU Grid is provided for research and educational purposes. You agree to use our services only for lawful purposes and in accordance with these terms.",
      },
      {
        title: "Account Responsibilities",
        content:
          "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      },
      {
        title: "Intellectual Property",
        content:
          "The CPU Grid platform, including its source code, design, and content, is protected by intellectual property laws. Your simulation data remains your property.",
      },
      {
        title: "Limitation of Liability",
        content:
          'CPU Grid is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.',
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    lastUpdated: "December 15, 2024",
    sections: [
      {
        title: "What Are Cookies",
        content:
          "Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences.",
      },
      {
        title: "Essential Cookies",
        content:
          "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
      },
      {
        title: "Analytics Cookies",
        content:
          "We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and user experience.",
      },
      {
        title: "Preference Cookies",
        content:
          "These cookies remember your settings and preferences, such as your preferred language or region, to provide a more personalized experience.",
      },
      {
        title: "Managing Cookies",
        content:
          "You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.",
      },
    ],
  },
}

export function LegalPage({ type }: LegalPageProps) {
  const router = useRouter()
  const content = legalContent[type]
  const navItems = [
    { key: "privacy" as const, label: "Privacy Policy" },
    { key: "terms" as const, label: "Terms of Service" },
    { key: "cookies" as const, label: "Cookie Policy" },
  ]

  return (
    <div className="min-h-screen bg-canvas pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-slate-900 p-2 rounded-xl">
                <Cpu className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">CPU Grid</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => router.push(`/legal/${item.key}`)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    type === item.key
                      ? "bg-slate-900 text-white dark:bg-white/10"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="glass card-super-lg p-12 shadow-deep">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-2">{content.title}</h1>
            <p className="text-slate-500 dark:text-slate-300 mb-12">Last updated: {content.lastUpdated}</p>

            <div className="space-y-10">
              {content.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    {i + 1}. {section.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{section.content}</p>
                </section>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
              <p className="text-slate-500 dark:text-slate-300">
                If you have any questions about this policy, please contact us at{" "}
                <a href="mailto:legal@cpugrid.dev" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200">
                  legal@cpugrid.dev
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
