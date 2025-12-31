"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { gsap } from "gsap";
import { toast } from "sonner";
import { Clock, Github, Mail, MapPin, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  const [category, setCategory] = useState<string>("");

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const left = rootRef.current?.querySelector<HTMLElement>(
        '[data-contact="left"]'
      );
      const right = rootRef.current?.querySelector<HTMLElement>(
        '[data-contact="right"]'
      );
      const fields = gsap.utils.toArray<HTMLElement>(
        '[data-contact="field"]',
        rootRef.current
      );

      if (prefersReducedMotion) {
        if (left) gsap.set(left, { opacity: 1, y: 0 });
        if (right) gsap.set(right, { opacity: 1, y: 0 });
        if (fields.length) gsap.set(fields, { opacity: 1, y: 0 });
        return;
      }

      if (left) gsap.set(left, { opacity: 0, y: 14 });
      if (right) gsap.set(right, { opacity: 0, y: 14 });
      if (fields.length) gsap.set(fields, { opacity: 0, y: 10 });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const left = root.querySelector<HTMLElement>('[data-contact="left"]');
        const right = root.querySelector<HTMLElement>('[data-contact="right"]');
        const fields = Array.from(
          root.querySelectorAll<HTMLElement>('[data-contact="field"]')
        );

        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: "power3.out" },
        });
        if (left) tl.to(left, { opacity: 1, y: 0, clearProps: "transform" });
        if (right)
          tl.to(
            right,
            { opacity: 1, y: 0, clearProps: "transform" },
            left ? "-=0.35" : 0
          );
        if (fields.length)
          tl.to(
            fields,
            { opacity: 1, y: 0, stagger: 0.07, clearProps: "transform" },
            "-=0.25"
          );

        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast("Message queued (UI demo). We’ll connect backend soon.");
  };

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[rgb(var(--bg))] py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[rgb(var(--bg))]" />
        <div className="absolute inset-0 opacity-[0.32] [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(226,232,240,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -right-48 bottom-[-200px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08),transparent_62%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[var(--noise-opacity)]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div
            data-contact="left"
            className="rounded-3xl border border-slate-200/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] p-10 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.10)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[2px] hover:border-slate-200/80 dark:hover:border-white/14 hover:shadow-[0_50px_90px_-28px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_50px_90px_-28px_rgba(0,0,0,0.65)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <h2 className="mb-6 text-5xl font-bold leading-[0.9] tracking-[-0.05em] text-slate-900 dark:text-slate-100 md:text-7xl">
              Contact Us
            </h2>
            <p className="mb-12 text-xl leading-relaxed text-slate-600 dark:text-slate-300">
              Questions about the distributed simulation platform, worker
              network, or research use cases? Reach the team directly or send a
              message.
            </p>

            <div className="mb-10 inline-flex items-center rounded-full border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-[rgb(var(--glass)/0.65)] px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 backdrop-blur-xl shadow-[0_12px_30px_-22px_rgba(15,23,42,0.24)] dark:shadow-[0_12px_30px_-22px_rgba(0,0,0,0.55)]">
              Open to research collaboration
            </div>

            <div className="space-y-6">
              <div className="group rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[1px] hover:border-slate-200/80 dark:hover:border-white/14 hover:shadow-[0_22px_52px_-36px_rgba(15,23,42,0.22)] dark:hover:shadow-[0_22px_52px_-36px_rgba(0,0,0,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-indigo-500/40 via-violet-500/30 to-rose-500/15 p-px shadow-[0_16px_40px_-28px_rgba(99,102,241,0.35)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/75 dark:bg-[rgb(var(--glass)/0.75)] backdrop-blur-2xl">
                      <Mail className="h-5 w-5 text-indigo-700" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">
                      Email
                    </div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      cpugrid.team@university.edu
                    </div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                      Best for demos, collaborations, and support.
                    </div>
                  </div>
                </div>
              </div>

              <div className="group rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[1px] hover:border-slate-200/80 dark:hover:border-white/14 hover:shadow-[0_22px_52px_-36px_rgba(15,23,42,0.22)] dark:hover:shadow-[0_22px_52px_-36px_rgba(0,0,0,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-indigo-500/40 via-violet-500/30 to-rose-500/15 p-px shadow-[0_16px_40px_-28px_rgba(99,102,241,0.35)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/75 dark:bg-[rgb(var(--glass)/0.75)] backdrop-blur-2xl">
                      <MapPin className="h-5 w-5 text-indigo-700" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">
                      Lab / Department
                    </div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      FSA Agadir — Software Engineering Lab
                    </div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                      Distributed Systems • Monte Carlo Simulation.
                    </div>
                  </div>
                </div>
              </div>

              <div className="group rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[1px] hover:border-slate-200/80 dark:hover:border-white/14 hover:shadow-[0_22px_52px_-36px_rgba(15,23,42,0.22)] dark:hover:shadow-[0_22px_52px_-36px_rgba(0,0,0,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-indigo-500/40 via-violet-500/30 to-rose-500/15 p-px shadow-[0_16px_40px_-28px_rgba(99,102,241,0.35)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/75 dark:bg-[rgb(var(--glass)/0.75)] backdrop-blur-2xl">
                      <Clock className="h-5 w-5 text-indigo-700" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">
                      Response time
                    </div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      Typically replies within 24–48h
                    </div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                      Weekdays, GMT+1.
                    </div>
                  </div>
                </div>
              </div>

              <div className="group rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[1px] hover:border-slate-200/80 dark:hover:border-white/14 hover:shadow-[0_22px_52px_-36px_rgba(15,23,42,0.22)] dark:hover:shadow-[0_22px_52px_-36px_rgba(0,0,0,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-indigo-500/40 via-violet-500/30 to-rose-500/15 p-px shadow-[0_16px_40px_-28px_rgba(99,102,241,0.35)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/75 dark:bg-[rgb(var(--glass)/0.75)] backdrop-blur-2xl">
                      <Github className="h-5 w-5 text-indigo-700" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-500 dark:text-slate-300">
                      GitHub
                    </div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      Follow development & issues
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        disabled
                        aria-label="CPU Grid Repository link coming soon"
                        title="Link coming soon"
                        className="
                          inline-flex items-center gap-2
                          rounded-xl border border-slate-200/70
                          dark:border-white/10
                          bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] px-4 py-2
                          text-sm font-semibold text-slate-700 dark:text-slate-200
                          opacity-70 cursor-not-allowed
                        "
                      >
                        <Github className="h-4 w-4" />
                        CPU Grid Repository (coming soon)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            data-contact="right"
            className="relative overflow-hidden rounded-3xl border border-indigo-200/60 dark:border-white/10 bg-gradient-to-br from-indigo-50/90 via-white/80 to-white/70 dark:from-[rgb(var(--glass)/0.65)] dark:via-[rgb(var(--glass)/0.55)] dark:to-[rgb(var(--glass)/0.65)] p-10 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.10)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[2px] hover:border-indigo-200/80 dark:hover:border-white/14 hover:shadow-[0_50px_90px_-28px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_50px_90px_-28px_rgba(0,0,0,0.65)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative">
              <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                Send a message
              </h3>
              <p className="mb-3 text-slate-600 dark:text-slate-300">
                Tell us what you’re building and we’ll respond with next steps.
              </p>
              <div className="mb-8 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                <span>Your message stays private.</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div data-contact="field">
                  <label className="sr-only" htmlFor="contact-name">
                    Full name
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Full name"
                    className="h-12 rounded-xl border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500/25 focus-visible:border-indigo-500/40"
                  />
                </div>

                <div data-contact="field">
                  <label className="sr-only" htmlFor="contact-email">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="Email"
                    className="h-12 rounded-xl border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500/25 focus-visible:border-indigo-500/40"
                  />
                </div>

                <div data-contact="field">
                  <label className="sr-only" htmlFor="contact-category">
                    Role / Category
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger
                      id="contact-category"
                      className="h-12 w-full rounded-xl border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] px-4 text-slate-900 dark:text-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500/25 focus-visible:border-indigo-500/40"
                    >
                      <SelectValue placeholder="Role / Category" />
                    </SelectTrigger>
                    <SelectContent className="border-slate-200/70 dark:border-white/10 bg-white/95 dark:bg-[rgb(var(--glass)/0.85)] backdrop-blur-2xl">
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Researcher">Researcher</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Institution">Institution</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div data-contact="field">
                  <label className="sr-only" htmlFor="contact-subject">
                    Subject
                  </label>
                  <Input
                    id="contact-subject"
                    placeholder="Subject"
                    className="h-12 rounded-xl border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500/25 focus-visible:border-indigo-500/40"
                  />
                </div>

                <div data-contact="field">
                  <label className="sr-only" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder="Message"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-[rgb(var(--glass)/0.55)] p-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500/40"
                  />
                </div>

                <div data-contact="field" className="pt-1">
                  <Button className="h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 font-medium text-white shadow-[0_18px_40px_-28px_rgba(99,102,241,0.55)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_22px_50px_-30px_rgba(99,102,241,0.60)] active:translate-y-0 active:shadow-[0_14px_36px_-28px_rgba(99,102,241,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <div className="mt-3 text-sm text-slate-500 dark:text-slate-300">
                    No spam. We only use your info to reply.
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
