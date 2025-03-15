# Proyecto NOC

El objetivo es crear una serie de tareas cutilizando Arquitectura Limpia y TypeScript

# dev
1. Clonar el archivo .env.template y renombrar .env
2. Configurar las variable de entorno

# Ejemplo: 
```

PORT=3000
MAILER_SERVICE=
MAILER_EMIAL=
MAILER_SECRET_KEY=
PROD=false

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=

```

4. Ejecutar el comando ``` npm install ```
5. Levantar las bases de datos con el comando ``` docker compose up -d ```
6. Ejecutar ``` npm run dev ```

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings