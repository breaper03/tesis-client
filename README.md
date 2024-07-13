This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Documentación 

    - Assist Control es una aplicación web que maneja la asistencia de los empleados, desde el panel de administración se puede crear un nuevo empleado, ver las asistencia y descargar un Excel con la asistencia de los usuarios.

## Tecnologias Usadas:

Frontend: 

NextJS^14: Framework para React para apps del lado del cliente y servidor utilizando App Router.

\- Zustand: Biblioteca para la gestión del estado.

\- Axios: Cliente HTTP para realizar solicitudes a la API.

\- TailwindCSS: Framework de CSS para diseño rápido y responsivo.

\- ShadCN: Herramienta para dar estilos y temas a los componentes.

Backend:

`	`NestJS: Framework de Node.js para construir aplicaciones del lado del servidor.

Zod:\*Biblioteca de validación de datos.

MongoDB: Base de datos NoSQL para almacenar información de negocios, servicios, clientes, etc.

## Requisitos Previos:

` `Node.js

`	 `MongoDB

` 	`Yarn o NPM

## Estructura del Backend: 

`	`Se crea el esquema del usuario y de las asistencias 

`	`Se crean los endpoints del usuario y asistencia, ambos un crud 

`	`Todo los datos validado y tipado 

## Estructura del FrontEnd:

`	`En la ruta \tesis-client\src\api se encuentran las api que se conectan a la base de datos y pueda hacer las respectivas peticiones a la bd y ser utilizadas en el frontend 

`	`Panel de Asistencia ruta ‘ / ’, se encuentra en la ubicación de \tesis-client\src\app\page.tsx y sus componentes en \tesis-client\src\app\components al igual también se encuentra un componente global como el de nav-bar, en este panel se encuentra la hora y el panel para que puedan ingresar su asistencia a través de la cedula

`	`Panel de Login (Auth) este se encuentra en la carpeta de \tesis-client\src\app\auth  con el formulario en la carpeta en components 

`	`Panel del Dashboard se encuentra en \tesis-client\src\app\dashboard y en la carpeta de components se encuentran la tabla de asistencia y de usuarios 
