import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitcher } from '@/components/themeswitcher';

export const PeopleNavbar = () => {
  return (
    <Navbar maxWidth="xl" position="static" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <ul className="hidden lg:flex gap-4 justify-center ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  );
};
