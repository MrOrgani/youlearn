import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center">
      <Image alt="Logo" src="/logo.svg" height={40} width={80} />;
    </Link>
  );
};
