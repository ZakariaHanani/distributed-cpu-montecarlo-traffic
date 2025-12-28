"use client"

import { Cpu, Github, Linkedin, Twitter, Youtube, ArrowUpRight } from "lucide-react"
import type { ViewType } from "@/app/page"

interface FooterProps {
  setCurrentView: (view: ViewType) => void
}

export function Footer({ setCurrentView }: FooterProps) {
  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Docs", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Contact", href: "#" },
  ]

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "X/Twitter", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ]

  return (
    <footer className="relative bg-white border-t border-slate-200">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-20 grid md:grid-cols-3 gap-16">
          {/* Left: Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-900 p-2 rounded-xl">
                <Cpu className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">CPU Grid</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-6">
              Distributed systems university project dedicated to advancing traffic simulation through high-performance
              Monte Carlo methods.
            </p>
            <div className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 cursor-pointer group">
              View on GitHub
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Middle: Quick Links */}
          <div className="flex justify-center">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-slate-500 hover:text-slate-900 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Social Links */}
          <div className="flex md:justify-end">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Connect With Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <p className="text-slate-400 text-sm mt-6">
                Follow us for updates on new features and research publications.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => setCurrentView("privacy")}
              className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setCurrentView("terms")}
              className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setCurrentView("cookies")}
              className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
            >
              Cookie Policy
            </button>
          </div>

          {/* Copyright */}
          <p className="text-slate-400 text-sm">© 2025 CPU Grid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
