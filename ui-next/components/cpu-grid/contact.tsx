"use client"

import { Send, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Contact() {
  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-white mb-6">
              Get Started
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12">
              Ready to accelerate your traffic simulations? Get in touch with our team or request early access to the
              platform.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@cpugrid.dev" },
                { icon: MapPin, label: "Location", value: "University Research Lab" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass-dark card-super-lg p-10 border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-2">Request Early Access</h3>
            <p className="text-slate-400 mb-8">Join the waitlist for priority access to CPU Grid.</p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-12"
                />
                <Input
                  placeholder="Last Name"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-12"
                />
              </div>
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-12"
              />
              <Input
                placeholder="Institution / Organization"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-12"
              />
              <textarea
                placeholder="Tell us about your use case..."
                rows={4}
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-xl h-12 font-medium">
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
