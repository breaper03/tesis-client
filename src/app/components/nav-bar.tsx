"use client";

import React from 'react';
import { ThemeSwitch } from '../../components/custom/theme-switch';
import LogoutButton from './button-logout';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/user/user.store';

export const NavBar = () => {
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);

  const isAuthPage = () => {
    return ['/auth'].includes(pathname) || ['/'].includes(pathname);
  };

  return (
    <div className='flex flex-row items-center justify-between w-full px-10 py-3 border-b'>
      <span className='text-2xl font-semibold'>Title Here!!</span>
      <div className='flex items-center gap-4'>
        <span className='text-lg font-semibold'>{user ? `${user.firstname} ${user.lastname[0]}.` : ""}</span>
        <ThemeSwitch />
        {!isAuthPage() && <LogoutButton />}
      </div>
    </div>
  );
};
