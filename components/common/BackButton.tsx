import Link from "next/link";

interface BackButtonProp {
  href: string;
  message: string;
}
const BackButton = ({ href, message }: BackButtonProp) => {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-[#77756d] hover:text-[#24231f]"
    >
      &larr; {message}
    </Link>
  );
};

export default BackButton;
