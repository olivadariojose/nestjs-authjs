-- Instalamos Auth JS de la pagina principal
-- creamos en la RAIZ DEL PROYECTO el archivo types.dts
-- Agregamos el archivo types.dts en el tsconfig.json :
        -- Debe quedar asi :   "include": [ "next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "types.d.ts"],
    al final se ve claramente "types.d.ts"
-- Creamos en la raiz el archivo auth.ts
-- creamos el route.ts en la ruta src/app/api/auth/[...nextauth]
-- Podemos crear un middleware tambien pero este se crea dentro de la raiz/app con el nombre middleware.ts
-- Si vamos utilizar la session del lado del cliente debemos crear un proveedor de la session en mi caso esta en raiz/libraries/authjs/SessionProviderComponent.ts y usarlo en el layout principal