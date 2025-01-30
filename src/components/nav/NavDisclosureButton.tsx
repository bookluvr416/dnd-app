'use client'

import { DisclosureButton } from "@headlessui/react";
import { usePathname } from "next/navigation";

const NavDisclosureButton: React.FC<{ href: string, text: string }> = ({ href, text }) => {
  const currentPath = usePathname();

  const extraCss = currentPath === href ? 'bg-emerald-950/50 text-white' : 'text-gray-300 hover:bg-emerald-950/25 hover:text-white';

  return (
    <DisclosureButton
      key={text}
      as="a"
      href={href}
      aria-current={currentPath === href ? 'page' : undefined}
      className={`block rounded-md px-3 py-2 text-base font-medium ${extraCss}`}
    >
      {text}
    </DisclosureButton>
  )
};

export default NavDisclosureButton;
