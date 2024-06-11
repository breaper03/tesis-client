"use client";

import React from 'react';
import { ThemeSwitch } from '../../components/custom/theme-switch';
import LogoutButton from './button-logout';
import { usePathname } from 'next/navigation';

export const NavBar = () => {
  const pathname = usePathname();

  const isAuthPage = () => {
    return ['/auth'].includes(pathname);
  };

  return (
    <div className='flex flex-row items-center justify-between w-full px-10 py-3 border-b'>
      <span className='text-2xl font-semibold'>Title Here!!</span>
      <div className='flex items-center gap-4'>
        <ThemeSwitch />
        {!isAuthPage() && <LogoutButton />}
      </div>
    </div>
  );
};
