import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { authOptions } from '@/lib/auth';
import SignOutButton from '../auth/SignOutButton';
import NavLink from './NavLink';
import Image from 'next/image';
import NavDisclosureButton from './NavDisclosureButton';
import d20Img from '@/assets/d20.webp';

export default async function Header() {
  const user = await getServerSession(authOptions);

  const linkCss = 'text-violet-100 p-3 hover:bg-violet-500/30 hover:text-purple-50 rounded-md';

  return (
    <header className='sticky top-0'>
        <Disclosure as="nav" className='bg-gradient-to-r from-violet-950/70 to-purple-950/70'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">

              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-4 text-gray-400 hover:bg-emerald-950/30 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>

            <div className='font-quintessential bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-300 font-bold inline-flex pl-14 md:p-6'>
              <Image
                src={d20Img}
                alt=''
                width={30}
                height={30}
                className='rounded-sm'
              />
              <span className='p-1'><Link href="/">D&D App</Link></span>
            </div>

            <div className='hidden md:ml-6 md:block'>
              <ul className='flex h-16 items-center justify-between'>
                <li className='py-6 px-1'>
                  <NavLink href="/" text="Home" css={linkCss} />
                </li>
                <li className='py-6 px-1'>
                  <NavLink href="/dice-roller" text="Dice Roller" css={linkCss} />
                </li>
                <li className='py-6 px-1'>
                  <NavLink href="/characters" text="Characters" css={linkCss} />
                </li>
                <li className='py-6 px-1'>
                  <NavLink href="/protected" text="Protected" css={linkCss} />
                </li>
              </ul>
            </div>
            <div className='md:ml-6 md:block'>
              <ul>
                {user && (
                  <li className='p-6'>
                    <SignOutButton css={linkCss} />
                  </li>
                )}
                {!user && (
                  <li className='p-6 text-green-200'>
                    <NavLink href="/login" text="Sign In" css={linkCss} />
                  </li>
                )}
              </ul>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <NavDisclosureButton href="/" text="Home" />
              <NavDisclosureButton href="/dice-roller" text="Dice Roller" />
              <NavDisclosureButton href="/characters" text="Characters" />
              <NavDisclosureButton href="/protected" text="Protected" />
            </div>
          </DisclosurePanel>
        </Disclosure>
    </header>
  );
}
