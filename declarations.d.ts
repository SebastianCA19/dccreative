// esto es para quitar el error del editor de TypeScript que decía:
//   "Cannot find module './globals.css'"
//
//Next.js jode con los tipos para los CSS "con módulo" (*.module.css),
// pero no para un CSS normal (*.css) porque el editor revisa el Typescript y no encuentra el tipo de módulo para los CSS normales. Esto es un error del editor, porque Next.js sí soporta CSS normales, pero el editor no lo sabe. Con esto ya deja de molestar.
// Con esto ya deja de molestar
// fuap
declare module "*.css";
