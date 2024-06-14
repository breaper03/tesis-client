"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/user/user.store';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { authUser } from '@/api/auth/auth.api';
import { set } from 'date-fns';
import { Spinner } from '@/components/custom/spinner';

export default function Form() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [form, setForm] = useState({
        doc: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        doc: {
            error: false,
            message: '',
        },
        password: {
            error: false,
            message: '',
        },
    })
    const FormSchema = z.object({
        doc: z.string().min(7).max(8).regex(/^[0-9]{7,8}$/),
        password: z.string().trim().min(8),
    });

    const login = useAuthStore((state) => state.login); 

    const handleOnChange = (name: string, text: string) => {
        setFormErrors({
            ...formErrors,
            [name]: {
                error: false,
                message: "",
            },
        })
        setForm({ ...form, [name]: text })
    };

    const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
        event.preventDefault();
        setIsLoading(true)
        const isFormValid = FormSchema.safeParse(form)
        if (!isFormValid.success) {
            const { doc, password } = isFormValid.error.format()
            setFormErrors({
                doc: {
                    error: doc ? true : false,
                    message: doc?._errors ? "La cedula de identidad no es valida." : ""
                },
                password: {
                    error: password ? true : false,
                    message: password?._errors ? "La contraseña no es valida." : ""
                },
            })
        } else {
            const { data, status } = await authUser(form);
            if (status !== 201) {
                const err: string = data.trim().includes("PASSWORD") ? "password" : "doc";
                setFormErrors({
                    ...formErrors,
                    [err]: {
                        error: true,
                        message: `La ${err === "doc" ? "cedula de identidad" : "contraseña"} no es valida.`,
                    }
                })
            } else {
                login(data.token, data.user)
                router.push("/dashboard");
            }
        }
        setIsLoading(false)
    };

    // return (
    //     <div className='flex flex-row items-center w-full justify-center'>
    //         <div className="md:w-1/2 px-16">
    //             <div className="bg-gray-100 rounded-2xl shadow-lg p-5 border border-blue-600 dark:bg-slate-950">
    //                 <h2 className="font-bold text-2xl text-center text-indigo-950 dark:text-white">Inicia Sesión</h2>
    //                 <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
    //                     <h3 className='mt-2'>Cédula</h3>
    //                     <div className="relative">
    //                         <input
    //                             className={`p-2 rounded-xl border w-full ${isDocumentValid ? 'border-green-500' : 'border-gray-600'}`}
    //                             type="text"
    //                             name="cedula"
    //                             placeholder="cédula"
    //                             value={form.doc}
    //                             onChange={(e) => handleOnChange("doc", e.target.value)}
    //                         />
    //                     </div>
    //                     <h3>Contraseña</h3>
    //                     <div className="relative">
    //                         <input
    //                             className={`p-2 rounded-xl border w-full ${isPasswordValid ? 'border-green-500' : 'border-gray-600'}`}
    //                             type={passwordVisible ? 'text' : 'password'}
    //                             name="contrasena"
    //                             placeholder="contraseña"
    //                             value={password}
    //                             onChange={(e) => setPassword(e.target.value)}
    //                         />
    //                         <span
    //                             className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
    //                             onClick={togglePasswordVisibility}
    //                         >
    //                             {passwordVisible ? (
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
    //                             ) : (
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
    //                             )}
    //                         </span>
    //                     </div>
    //                     <button 
    //                         type="submit" 
    //                         className={`bg-indigo-600 hover:bg-indigo-900 text-white rounded-2xl p-2 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
    //                         disabled={!isFormValid}
    //                     >
    //                         Login
    //                     </button>
    //                     {error && <p className="text-red-500 mt-2">{error}</p>}
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <Card className="w-fit min-w-[400px]">
            <CardHeader>
                <CardTitle className='text-xl'>Iniciar Sesion</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="doc">Cedula de Identidad</Label>
                            <Input id="doc" placeholder="Cedula de Identidad"  onChange={(e) => handleOnChange("doc", e.target.value)}/>
                            { formErrors.doc.error && <p className="text-red-500 text-xs">{formErrors.doc.message}</p> }
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className='flex flex-row items-center justify-between gap-2 w-full h-fit'>
                                <Input id="password" placeholder="Contraseña" type={passwordVisible ? 'text' : 'password'} onChange={(e) => handleOnChange("password", e.target.value)}/>
                                <Button size="icon" className='px-2' onClick={() => setPasswordVisible(!passwordVisible)} type='button'>
                                    {
                                        passwordVisible ? <Eye size={18} color='white'/> : <EyeOff size={18} color='white'/>
                                    }
                                </Button>
                                
                            </div>
                            { formErrors.password.error && <p className="text-red-500 text-xs">{formErrors.password.message}</p> }
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Volver</Button>
                <Button 
                    onClick={handleSubmit} className='flex flex-row items-center justify-between gap-1.5 dark:text-white' 
                    disabled={form.doc.trim() === "" || form.password.trim() === "" || formErrors.doc.error || formErrors.password.error}
                >
                    Iniciar Sesion {isLoading &&<Spinner size="small"/>}
                </Button>
            </CardFooter>
        </Card>
    )
}