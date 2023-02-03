import Link from "next/link";
import Image from 'next/image'

export default function NavbarLogo() {
  return (
    <Link href='/'>
      <Image src='/dyad-logo.svg' alt='logo' width={56} height={56}/>
      {/* <img src={logo} alt="logo" className="w-14" onClick={() => navigate("/")} /> */}
    </Link>
  );
}
