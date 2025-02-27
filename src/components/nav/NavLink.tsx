'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink: React.FC<{ href: string, text: string, css:string }> = ({ href, text, css }) => {
  const currentPath = usePathname();

  const additionalCss = currentPath === href ? 'bg-violet-500/50 font-bold' : '';

  return (
    <Link href={href} className={`${css} ${additionalCss}`}>
      {text}
    </Link>
  );
};

export default NavLink;
