"use client"

const partners = [
  { name: "MIT", logo: "MIT" },
  { name: "Stanford", logo: "Stanford" },
  { name: "Berkeley", logo: "Berkeley" },
  { name: "Carnegie Mellon", logo: "CMU" },
  { name: "Georgia Tech", logo: "GT" },
  { name: "ETH Zurich", logo: "ETH" },
]

export function Showcase() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 mb-6">
            Ecosystem & Partners
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Trusted by leading research institutions worldwide
          </p>
        </div>

        {/* Partner Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {partners.map((partner, i) => (
            <div key={i} className="glass card-super p-8 shadow-deep flex items-center justify-center liquid-hover">
              <span className="text-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors">
                {partner.logo}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="glass card-super-lg p-12 shadow-deep text-center">
            <blockquote className="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed mb-8">
              "CPU Grid has revolutionized how we approach traffic simulation research. What used to take weeks now
              completes in hours."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                DR
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900">Dr. Rachel Chen</div>
                <div className="text-slate-500">Director of Transportation Research, MIT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
