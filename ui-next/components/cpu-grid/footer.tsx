"use client";

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const projectLink = "https://github.com/ZakariaHanani/distributed-cpu-montecarlo-traffic";
  
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Team", href: "/team" },
    { label: "GitHub", href: projectLink },
    { label: "Become Worker", href: "/become-worker" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: projectLink },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-ouadra/" },
    { icon: Mail, label: "Email", href: "mailto:mohamed.ouadra.84@edu.uiz.ac.ma" },
  ];

  return (
    <footer className="relative bg-white dark:bg-[rgb(var(--bg))] border-t border-slate-200 dark:border-white/10">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-20 grid md:grid-cols-3 gap-16">
          {/* Left: Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-xl" />
                <div className="relative bg-slate-900 p-2 rounded-xl ring-1 ring-white/10">
                  <div className="relative size-6">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex size-3.5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 shadow-[0_0_0_1px_rgba(255,255,255,0.10)]">
                      <div className="size-[3px] rounded-full bg-white/90" />
                    </div>

                    <div className="absolute left-[10px] top-[8px] h-px w-3 origin-left -rotate-[26deg] rounded-full bg-gradient-to-r from-indigo-300/70 via-violet-300/70 to-violet-300/10" />
                    <div className="absolute left-[10px] top-1/2 h-px w-3 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-300/70 via-violet-300/70 to-violet-300/10" />
                    <div className="absolute left-[10px] bottom-[8px] h-px w-3 origin-left rotate-[26deg] rounded-full bg-gradient-to-r from-indigo-300/70 via-violet-300/70 to-violet-300/10" />

                    <div className="absolute right-0 top-[3px] size-2 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
                    <div className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
                    <div className="absolute right-0 bottom-[3px] size-2 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
                  </div>
                </div>
              </div>
              <span className="text-2xl text-slate-900 dark:text-slate-100 tracking-tight">
                <span className="font-semibold">CPU</span>{" "}
                <span className="font-bold">Grid</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-300 leading-relaxed mb-6">
              Distributed systems university project dedicated to advancing
              traffic simulation through high-performance Monte Carlo methods.
            </p>
            <a 
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-medium hover:text-indigo-700 dark:hover:text-indigo-200 cursor-pointer group"
            >
              View on GitHub
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Middle: Quick Links */}
          <div className="flex justify-center">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-6">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Social Links */}
          <div className="flex md:justify-end">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-6">
                Connect With Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-white/10 hover:text-white dark:hover:text-slate-100 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <p className="text-slate-400 dark:text-slate-400 text-sm mt-6">
                Follow us for updates on new features and research publications.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/legal/privacy"
              className="text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/cookies"
              className="text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-sm"
            >
              Cookie Policy
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-slate-400 dark:text-slate-400 text-sm">
            © 2025 CPU Grid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
