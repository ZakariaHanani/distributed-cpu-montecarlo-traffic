import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const error =
    typeof searchParams?.error === "string" ? searchParams.error : undefined;
  const next =
    typeof searchParams?.next === "string" ? searchParams.next : undefined;
  const returnTo =
    typeof searchParams?.returnTo === "string"
      ? searchParams.returnTo
      : undefined;

  const params = new URLSearchParams();
  params.set("view", "login");
  if (error) params.set("error", error);
  if (next) params.set("next", next);
  if (returnTo) params.set("returnTo", returnTo);

  redirect("/?" + params.toString());
}
