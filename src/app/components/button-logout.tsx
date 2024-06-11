"use client";

import { useAuthStore } from '@/stores/user/user.store';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogoutButton = () => {
    const logout = useAuthStore((state) => state.logout); 
    const router = useRouter();
    const handleLogout = () => {
        logout(); 
        router.push('/auth'); 
    };

    return (
        <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-800 text-white rounded-md p-2 dark:bg-red-800"
        >
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;
