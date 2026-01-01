import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const error =
    typeof searchParams?.error === "string" ? searchParams.error : undefined;

  const params = new URLSearchParams();
  params.set("view", "login");
  if (error) params.set("error", error);

  redirect("/?" + params.toString());
}

