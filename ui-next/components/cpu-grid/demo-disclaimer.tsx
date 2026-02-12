"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

export function DemoDisclaimer({ className }: { className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full relative z-[100] ${className || ""}`}
    >
      <Alert className="bg-amber-500/10 border-amber-500/30 text-amber-200/90 backdrop-blur-xl py-3 px-4 rounded-2xl border shadow-sm">
        <AlertCircle className="stroke-amber-500" />
        <AlertTitle className="text-amber-500 font-bold tracking-tight text-xs mb-0.5">
          Online Demo Mode
        </AlertTitle>
        <AlertDescription className="text-xs opacity-90 leading-tight">
          Distributed engine is limited online. Full multi-node scaling available in local deployments.
        </AlertDescription>
      </Alert>
    </motion.div>
  );
}
