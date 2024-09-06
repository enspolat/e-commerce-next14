import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="bg-primary p-4 flex justify-between items-center">
      <Link className="text-white font-bold text-2xl" href="/">
        E-Ticaret
      </Link>
      <MobileMenu />
    </header>
  );
}
