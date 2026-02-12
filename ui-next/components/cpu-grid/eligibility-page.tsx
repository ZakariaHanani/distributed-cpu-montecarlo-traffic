"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cpu,
  HardDrive,
  Info,
  Monitor,
  MemoryStick,
  Network,
  Shield,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ViewType } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type EligibilityPageProps = {
  setCurrentView?: (view: ViewType) => void;
};

type EligibilityStatus =
  | "eligible"
  | "eligible_with_recommendations"
  | "not_eligible";

const systemRequirements = [
  {
    id: "os",
    icon: Monitor,
    label: "Operating System",
    requirement: "Windows 10+, macOS 11+, or Linux",
    detected: "Auto-detect coming soon",
    status: "pending" as const,
  },
  {
    id: "cpu",
    icon: Cpu,
    label: "CPU Cores",
    requirement: "4+ cores recommended",
    detected: "Auto-detect coming soon",
    status: "pending" as const,
  },
  {
    id: "ram",
    icon: MemoryStick,
    label: "RAM",
    requirement: "8 GB minimum",
    detected: "Auto-detect coming soon",
    status: "pending" as const,
  },
  {
    id: "disk",
    icon: HardDrive,
    label: "Available Disk Space",
    requirement: "2 GB free space",
    detected: "Auto-detect coming soon",
    status: "pending" as const,
  },
  {
    id: "network",
    icon: Network,
    label: "Network",
    requirement: "Stable internet connection",
    detected: "Auto-detect coming soon",
    status: "pending" as const,
  },
];

const safetyFeatures = [
  {
    id: "sandboxed",
    label: "Sandboxed Execution",
    description:
      "All tasks run in isolated containers with no access to your system",
    defaultEnabled: true,
  },
  {
    id: "no_file_access",
    label: "No File Access",
    description: "Worker processes cannot read or write to your local files",
    defaultEnabled: true,
  },
  {
    id: "stop_anytime",
    label: "Stop Anytime",
    description: "You can pause or stop contributing at any moment",
    defaultEnabled: true,
  },
];

const recommendations = [
  "Close resource-heavy applications for optimal performance",
  "Ensure stable internet connection during task execution",
  "Keep your system updated for security patches",
  "Consider running during off-peak hours for better task allocation",
];

export function EligibilityPage({ setCurrentView }: EligibilityPageProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [safetyToggles, setSafetyToggles] = useState<Record<string, boolean>>({
    sandboxed: true,
    no_file_access: true,
    stop_anytime: true,
  });
  const [eligibilityStatus] = useState<EligibilityStatus>(
    "eligible_with_recommendations"
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(
      sections,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, []);

  // Step transition animation
  useEffect(() => {
    const currentStepEl = stepRefs.current[currentStep - 1];
    if (currentStepEl) {
      gsap.fromTo(
        currentStepEl,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/become-worker");
    }
  };

  const handleGetStarted = () => {
    toast("Worker setup coming soon! You'll be notified when ready.");
  };

  const getStatusIcon = (status: EligibilityStatus) => {
    switch (status) {
      case "eligible":
        return <CheckCircle2 className="size-8 text-emerald-500" />;
      case "eligible_with_recommendations":
        return <AlertTriangle className="size-8 text-amber-500" />;
      case "not_eligible":
        return <XCircle className="size-8 text-red-500" />;
    }
  };

  const getStatusText = (status: EligibilityStatus) => {
    switch (status) {
      case "eligible":
        return {
          title: "You're Eligible!",
          subtitle: "Your system meets all requirements",
        };
      case "eligible_with_recommendations":
        return {
          title: "Eligible with Recommendations",
          subtitle: "Your system can run tasks with some optimizations",
        };
      case "not_eligible":
        return {
          title: "Not Eligible",
          subtitle: "Your system doesn't meet minimum requirements",
        };
    }
  };

  const statusInfo = getStatusText(eligibilityStatus);

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-[rgb(var(--glass)/0.55)] border-b border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/become-worker")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Eligibility Check
            </span>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Stepper */}
        <div className="mb-12" data-animate>
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(step)}
                  className={`relative flex items-center justify-center size-12 rounded-full font-semibold text-sm transition-all duration-300 ${
                    step === currentStep
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110"
                      : step < currentStep
                      ? "bg-emerald-500 text-white"
                      : "bg-white/70 dark:bg-white/5 text-slate-400 dark:text-slate-300 border border-white/60 dark:border-white/10"
                  }`}
                >
                  {step < currentStep ? <Check className="size-5" /> : step}
                </button>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 rounded-full transition-colors duration-300 ${
                      step < currentStep
                        ? "bg-emerald-500"
                        : "bg-slate-200 dark:bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-[4.5rem] mt-4">
            <span
              className={`text-xs font-medium ${
                currentStep === 1
                  ? "text-indigo-600"
                  : "text-slate-500 dark:text-slate-300"
              }`}
            >
              System Check
            </span>
            <span
              className={`text-xs font-medium ${
                currentStep === 2
                  ? "text-indigo-600"
                  : "text-slate-500 dark:text-slate-300"
              }`}
            >
              Permissions
            </span>
            <span
              className={`text-xs font-medium ${
                currentStep === 3
                  ? "text-indigo-600"
                  : "text-slate-500 dark:text-slate-300"
              }`}
            >
              Results
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {/* Step 1: System Requirements */}
          {currentStep === 1 && (
            <div
              ref={(el) => {
                stepRefs.current[0] = el;
              }}
              data-animate
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  System Requirements
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  Check if your system meets the minimum requirements
                </p>
              </div>

              <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 via-white/60 to-indigo-50/40 dark:from-white/10 dark:via-white/5 dark:to-indigo-500/10 backdrop-blur-xl shadow-xl p-6 space-y-4">
                {systemRequirements.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/10">
                      <req.icon className="size-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {req.label}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300">
                          {req.requirement}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500 dark:text-slate-300">
                        <Info className="size-3.5" />
                        <span>{req.detected}</span>
                      </div>
                    </div>
                    <div className="size-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                      <span className="text-slate-400 text-xs">—</span>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20">
                  <Info className="size-4 text-amber-600 dark:text-amber-200 shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Auto-detection is coming soon. For now, please verify your
                    system meets these requirements manually.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Permissions & Safety */}
          {currentStep === 2 && (
            <div
              ref={(el) => {
                stepRefs.current[1] = el;
              }}
              data-animate
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Permissions & Safety
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  Review our safety measures and grant permissions
                </p>
              </div>

              <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 via-white/60 to-emerald-50/40 dark:from-white/10 dark:via-white/5 dark:to-emerald-500/10 backdrop-blur-xl shadow-xl p-6 space-y-4">
                {safetyFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10"
                  >
                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10">
                      <ShieldCheck className="size-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <Label
                        htmlFor={feature.id}
                        className="font-semibold text-slate-900 dark:text-slate-100 cursor-pointer"
                      >
                        {feature.label}
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-300 mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                    <Switch
                      id={feature.id}
                      checked={safetyToggles[feature.id]}
                      onCheckedChange={(checked) =>
                        setSafetyToggles((prev) => ({
                          ...prev,
                          [feature.id]: checked,
                        }))
                      }
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
                ))}

                <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20">
                  <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-200 shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    Your privacy and security are our top priority. All
                    computations run in isolated sandboxes with no access to
                    your personal data.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {currentStep === 3 && (
            <div
              ref={(el) => {
                stepRefs.current[2] = el;
              }}
              data-animate
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Eligibility Results
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  Your system check results are ready
                </p>
              </div>

              <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 via-white/60 to-violet-50/40 dark:from-white/10 dark:via-white/5 dark:to-violet-500/10 backdrop-blur-xl shadow-xl p-8">
                {/* Status Card */}
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="size-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-500/20 dark:to-amber-500/10 flex items-center justify-center mb-4 shadow-lg">
                    {getStatusIcon(eligibilityStatus)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {statusInfo.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    {statusInfo.subtitle}
                  </p>
                </div>

                {/* Recommendations */}
                {eligibilityStatus === "eligible_with_recommendations" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <Sparkles className="size-4 text-amber-500" />
                      <span>Recommendations for optimal performance:</span>
                    </div>
                    <div className="space-y-2">
                      {recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10"
                        >
                          <div className="size-6 rounded-full bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-amber-700 dark:text-amber-200">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-sm text-slate-700 dark:text-slate-200">
                            {rec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {eligibilityStatus === "eligible" && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20">
                    <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-200" />
                    <span className="text-sm text-emerald-800 dark:text-emerald-200">
                      Great news! Your system is ready to start contributing to
                      CPU Grid.
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div
          className="w-full flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-white/10"
          data-animate
        >
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            className="h-11 px-5 rounded-full text-slate-700 dark:text-slate-200 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>

          <Button
            type="button"
            onClick={currentStep < 3 ? handleNext : handleGetStarted}
            className="h-11 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {currentStep < 3 ? (
              <>
                Continue
                <ArrowRight className="size-4 ml-2" />
              </>
            ) : (
              <>
                <Sparkles className="size-4 mr-2" />
                Get Started
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
