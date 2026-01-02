"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Github, GitPullRequest, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  avatarSrc?: string;
  tag: {
    label: string;
    className: string;
  };
};

const team: TeamMember[] = [
  {
    name: "Mohamed Ouijjane",
    role: "Full-Stack Contributor (Frontend + Coordination)",
    bio: "UI architecture in Next.js + Tailwind, UX flow, integration planning, and project coordination.",
    avatar: "MO",
    avatarSrc: "/images/team/mohamed-ouijjane.jpeg",
    tag: {
      label: "Frontend",
      className:
        "bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/15 dark:bg-indigo-500/15 dark:text-indigo-200 dark:ring-indigo-500/25",
    },
  },
  {
    name: "Zakaria Hanani",
    role: "Backend Developer",
    bio: "Distributed services, orchestration endpoints, and core backend implementation for the compute mesh.",
    avatar: "ZH",
    avatarSrc: undefined,
    tag: {
      label: "Backend",
      className:
        "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15 dark:bg-violet-500/15 dark:text-violet-200 dark:ring-violet-500/25",
    },
  },
  {
    name: "Ali Halla",
    role: "Backend Developer",
    bio: "Worker/master runtime features, task execution flow, and reliability improvements.",
    avatar: "AH",
    avatarSrc: "/images/team/ali-halla.jpeg",
    tag: {
      label: "Backend",
      className:
        "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15 dark:bg-violet-500/15 dark:text-violet-200 dark:ring-violet-500/25",
    },
  },
  {
    name: "Ayoub Karkouri",
    role: "Backend Developer",
    bio: "API foundations, simulation job lifecycle, and system integration support.",
    avatar: "AK",
    avatarSrc: undefined,
    tag: {
      label: "Backend",
      className:
        "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15 dark:bg-violet-500/15 dark:text-violet-200 dark:ring-violet-500/25",
    },
  },
  {
    name: "Ahmed Lahmaine",
    role: "Authentication & Security Engineer",
    bio: "Auth logic, JWT handling, role gating, and security best practices across services.",
    avatar: "AL",
    avatarSrc: "/images/team/ahmed-lahmaine.jpeg",
    tag: {
      label: "Security",
      className:
        "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/15 dark:bg-rose-500/15 dark:text-rose-200 dark:ring-rose-500/25",
    },
  },
  {
    name: "Hmad Ait Lahmouss",
    role: "Architecture & Conception",
    bio: "System design, UML/sequence flows, and distributed architecture documentation.",
    avatar: "HL",
    avatarSrc: undefined,
    tag: {
      label: "Architecture",
      className:
        "bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/10 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10",
    },
  },
  {
    name: "Mohamed Ouadra",
    role: "Frontend Developer",
    bio: "UI components, animations, and user flows for simulations, worker onboarding, and dashboards.",
    avatar: "MO",
    avatarSrc: "/images/team/mohamed-ouadra.jpeg",
    tag: {
      label: "Frontend",
      className:
        "bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-500/15 dark:bg-indigo-500/15 dark:text-indigo-200 dark:ring-indigo-500/25",
    },
  },
];

function TeamAvatar({
  name,
  initials,
  src,
}: {
  name: string;
  initials: string;
  src?: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full overflow-hidden flex items-center justify-center">
      {src && !errored ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="96px"
          className="object-cover object-center"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="text-2xl leading-none font-semibold text-white">
          {initials}
        </span>
      )}
    </div>
  );
}

export function Team() {
  const rootRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const header = rootRef.current?.querySelector<HTMLElement>(
        '[data-team="header"]'
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-team="card"]',
        rootRef.current
      );

      if (prefersReducedMotion) {
        if (header) gsap.set(header, { opacity: 1, y: 0 });
        if (cards.length) gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      if (header) gsap.set(header, { opacity: 0, y: 12 });
      if (cards.length) gsap.set(cards, { opacity: 0, y: 12 });
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

        const header = root.querySelector<HTMLElement>('[data-team="header"]');
        const cards = Array.from(
          root.querySelectorAll<HTMLElement>('[data-team="card"]')
        );

        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: "power3.out" },
        });
        if (header)
          tl.to(header, { opacity: 1, y: 0, clearProps: "transform" });
        if (cards.length)
          tl.to(
            cards,
            { opacity: 1, y: 0, stagger: 0.08, clearProps: "transform" },
            header ? "-=0.25" : 0
          );

        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={rootRef}
      className="py-32 relative bg-[rgb(var(--bg))] overflow-hidden"
      aria-labelledby="team-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.26] [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(226,232,240,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute left-1/2 top-24 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.09),transparent_62%)] blur-3xl" />
        <div className="absolute left-1/2 top-44 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.07),transparent_62%)] blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div
          data-team="header"
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6"
        >
          <div className="max-w-3xl">
            <h2
              id="team-title"
              className="text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9] text-slate-900 dark:text-slate-100 mb-5"
            >
              Core Contributors
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-300 leading-relaxed">
              Built by a university engineering team delivering a distributed
              CPU grid for Monte Carlo traffic simulation — from architecture to
              secure authentication and UI.
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
              Open-source workflow • GitHub issues/PRs • Iterative delivery
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/60 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-xl px-4 py-2 shadow-[0_18px_55px_-44px_rgba(15,23,42,0.25)] dark:shadow-[0_18px_55px_-44px_rgba(0,0,0,0.55)]">
            <GitPullRequest className="size-4 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              GitHub Contributors
            </span>
          </div>
        </div>

        <div
          className="team-marquee relative overflow-x-auto md:overflow-hidden"
          aria-label="Core contributors live conveyor"
        >
          <div className="team-marquee__track flex w-max flex-nowrap py-2">
            {[0, 1].map((copyIndex) => (
              <div
                key={copyIndex}
                aria-hidden={copyIndex === 1}
                className="flex flex-nowrap gap-6 pr-6"
              >
                {team.map((member) => (
                  <div
                    key={`${member.name}-${copyIndex}`}
                    className="shrink-0 w-[280px] sm:w-[320px] lg:w-[340px]"
                  >
                    <div
                      data-team="card"
                      className="group glass card-super-lg p-8 shadow-deep rounded-3xl border border-white/40 dark:border-[rgb(var(--border)/var(--glass-border-alpha))] bg-white/70 dark:bg-[rgb(var(--glass)/var(--glass-alpha))] backdrop-blur-xl text-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-glow hover:border-white/75 dark:hover:border-white/10 focus-within:-translate-y-1 focus-within:shadow-glow focus-within:border-white/75 dark:focus-within:border-white/10 liquid-hover"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                            member.tag.className,
                          ].join(" ")}
                        >
                          {member.tag.label}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-300">
                          v0.1
                        </span>
                      </div>

                      <div className="relative mx-auto mt-6 mb-6 w-fit">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
                        <TeamAvatar
                          name={member.name}
                          initials={member.avatar}
                          src={member.avatarSrc}
                        />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                        {member.name}
                      </h3>
                      <div className="text-indigo-700 dark:text-indigo-300 font-semibold mb-3">
                        {member.role}
                      </div>
                      <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed mb-6">
                        {member.bio}
                      </p>

                      <div className="flex items-center justify-center gap-3">
                        {[
                          { Icon: Github, label: "GitHub", primary: true },
                          { Icon: Linkedin, label: "LinkedIn", primary: false },
                          { Icon: Twitter, label: "X/Twitter", primary: false },
                        ].map(({ Icon, label, primary }) => (
                          <button
                            key={label}
                            type="button"
                            disabled
                            aria-label={`${label} link coming soon`}
                            title="Link coming soon"
                            className={[
                              "w-9 h-9 rounded-full flex items-center justify-center transition-all",
                              primary
                                ? "bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/15"
                                : "bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-slate-400 ring-1 ring-slate-900/10 dark:ring-white/10",
                              "opacity-50 cursor-not-allowed",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
                            ].join(" ")}
                          >
                            <Icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .team-marquee {
          --marquee-duration: 38s;
          scrollbar-width: none;
          -ms-overflow-style: none;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 6%,
            black 94%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 6%,
            black 94%,
            transparent
          );
        }

        .team-marquee::-webkit-scrollbar {
          display: none;
        }

        .team-marquee__track {
          animation: team-marquee-scroll var(--marquee-duration) linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        .team-marquee:hover .team-marquee__track,
        .team-marquee:focus-within .team-marquee__track {
          animation-play-state: paused;
        }

        @keyframes team-marquee-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 640px) {
          .team-marquee {
            --marquee-duration: 56s;
            mask-image: none;
            -webkit-mask-image: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .team-marquee__track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
