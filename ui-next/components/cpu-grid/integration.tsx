"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"

const codeExample = `import { CPUGrid } from '@cpu-grid/sdk';

const grid = new CPUGrid({
  apiKey: process.env.CPU_GRID_KEY,
  cluster: 'us-west-2'
});

// Define simulation parameters
const simulation = await grid.createSimulation({
  type: 'monte-carlo',
  iterations: 10_000_000,
  network: trafficNetwork,
  distribution: 'poisson'
});

// Execute across the mesh
const results = await simulation.run();

console.log(\`Completed in \${results.duration}ms\`);
console.log(\`Mean flow rate: \${results.meanFlow}\`);`

export function Integration() {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-32 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 mb-6">
              Developer Integration
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed mb-8">
              Integrate CPU Grid into your existing workflow with our comprehensive SDK. Available for TypeScript,
              Python, and Go.
            </p>

            <div className="space-y-4">
              {[
                "Type-safe APIs with full IntelliSense support",
                "Automatic retry and error handling",
                "Real-time progress streaming",
                "Webhook notifications for long-running jobs",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-slate-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code Block */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-[3rem] blur-3xl" />
            <div className="relative bg-slate-900 card-super-lg p-2 shadow-deep">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <button onClick={copyCode} className="text-slate-400 hover:text-white transition-colors p-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Code */}
              <pre className="p-6 overflow-x-auto">
                <code className="text-sm font-mono text-slate-300 leading-relaxed">
                  {codeExample.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-slate-600 w-8 shrink-0 select-none">{i + 1}</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: line
                            .replace(
                              /(import|from|const|await|async|console)/g,
                              '<span class="text-violet-400">$1</span>',
                            )
                            .replace(/('.*?')/g, '<span class="text-green-400">$1</span>')
                            .replace(/(\/\/.*)/g, '<span class="text-slate-500">$1</span>'),
                        }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
