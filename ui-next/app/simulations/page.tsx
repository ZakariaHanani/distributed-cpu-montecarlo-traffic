"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SimulationsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page with simulations view active
    router.replace("/?view=simulations");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(var(--bg))]">
      <div className="animate-pulse text-slate-500 dark:text-slate-400 font-medium">
        Redirecting to your simulations...
      </div>
    </div>
  );
}
