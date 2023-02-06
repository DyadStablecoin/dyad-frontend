import { useRouter } from "next/router";

export default function NavbarLogo() {
  let router = useRouter();

  return (
    <img
      src={"./dyad-logo.svg"}
      alt={"logo"}
      className="w-14"
      onClick={() => router.push("/")}
    />
  );
}
