"use client";

import { useAuthStore } from '@/stores/user/user.store';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Form() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [document, setDocument] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = useAuthStore((state) => state.login); 
    const error = useAuthStore((state) => state.error); 
    const user = useAuthStore((state) => state.user); 

    const isDocumentValid = /^[0-9]{7,8}$/.test(document);
    const isPasswordValid = password.trim() !== '';
    const isFormValid = isDocumentValid && isPasswordValid;

    useEffect(() => {
        if (user) {
            // Redireccionar base a sus roles
            if (user.access === 'admin') {
                router.push('/dashboard');
            } else if (user.access === 'worker') {
                router.push('/');
            } else {
                // rol invalido
                alert('Rol invalido');
            }
        }
    }, [user, router]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        await login(document, password);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='flex flex-row items-center w-full justify-center'>
            <div className="md:w-1/2 px-16">
                <div className="bg-gray-100 rounded-2xl shadow-lg p-5 border border-blue-600 dark:bg-slate-950">
                    <h2 className="font-bold text-2xl text-center text-indigo-950 dark:text-white">Inicia Sesión</h2>
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <h3 className='mt-2'>Cédula</h3>
                        <div className="relative">
                            <input
                                className={`p-2 rounded-xl border w-full ${isDocumentValid ? 'border-green-500' : 'border-gray-600'}`}
                                type="text"
                                name="cedula"
                                placeholder="cédula"
                                value={document}
                                onChange={(e) => setDocument(e.target.value)}
                            />
                        </div>
                        <h3>Contraseña</h3>
                        <div className="relative">
                            <input
                                className={`p-2 rounded-xl border w-full ${isPasswordValid ? 'border-green-500' : 'border-gray-600'}`}
                                type={passwordVisible ? 'text' : 'password'}
                                name="contrasena"
                                placeholder="contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                )}
                            </span>
                        </div>
                        <button 
                            type="submit" 
                            className={`bg-indigo-600 hover:bg-indigo-900 text-white rounded-2xl p-2 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!isFormValid}
                        >
                            Login
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}