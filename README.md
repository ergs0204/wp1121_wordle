# Introduce
      這個網站是以之前風靡一時的手遊「Wordle」作為出發點，實作的同時也在想怎麼樣能讓遊戲更加有趣。於是，我們在Wordle這款遊戲中添加了多人對戰模式，網站支持兩個人在時間壓力下，比出誰的英文單字造詣更強，非常新奇。其他功能像是支持玩家登入系統，以及之前曾完成過的破關紀錄，都會存在統計資料後端。歡迎大家來一同對戰！

* 實作功能：使用者登入系統、單人遊玩、多人對戰、歷史遊玩紀錄（待補）


# Run the project

1. Install dependencies
   
   yarn
   
   
   sudo apt install python3
   pip3 install psycopg2-binary
   

2. Create .env.local file in the project root and add the following content:

   
text

   AUTH_SECRET=<this can be any random string>

   

3. Start the database
   
   docker compose up -d
   
4. Run migrations
   
   yarn migrate
   
5. Load corpus
   
   cd setup
   python3 loadcorpus.py
   
6. Start the socket.io server
   
   cd src
   node server.js
   
7. Start the development server
   
   yarn dev
   
8. Open http://localhost:3000 in your browser


# Setup Guide

## Prettier and ESLint

1. Install prettier and prettier plugins
   
   yarn add -D prettier prettier-plugin-tailwindcss @trivago/prettier-plugin-sort-imports
   
2. Install eslint and eslint plugins
   
   yarn add -D eslint typescript @typescript-eslint/parser eslint-config-prettier @typescript-eslint/eslint-plugin
   
3. Copy and paste the ./prettierrc.cjs and ./eslintrc.json from this repo to your project root.

4. Add format script to package.json
   
   {
     "scripts": {
       "format": "prettier --write ."
     }
   }
   
5. Check if the scripts work
   
   yarn format
   yarn lint
   

## Drizzle Setup

1. Install drizzle

   
   yarn add drizzle-orm pg
   yarn add -D drizzle-kit @types/pg
   

2. Copy the docker-compose.yml from this repo to your project root.

3. Start the database

   
   docker compose up -d
   

4. Add POSTGRES_URL to .env.local:
   
text
   ...
   POSTGRES_URL=postgres://postgres:postgres@localhost:5432/notion-clone
   
5. Create db folder
   
   cd ./src
   mkdir db
   
6. Create the ./src/db/index.ts file:

   
   import { drizzle } from "drizzle-orm/node-postgres";
   import { Client } from "pg";

   import { privateEnv } from "@/lib/env/private";

   const client = new Client({
     connectionString: privateEnv.POSTGRES_URL,
     connectionTimeoutMillis: 5000,
   });
   await client.connect();
   export const db = drizzle(client);
   

   Remember to setup the environment variables handlers in src/lib/env/private.ts:

   
   import { z } from "zod";

   const privateEnvSchema = z.object({
     POSTGRES_URL: z.string().url(),
   });

   type PrivateEnv = z.infer<typeof privateEnvSchema>;

   export const privateEnv: PrivateEnv = {
     POSTGRES_URL: process.env.POSTGRES_URL!,
   };

   privateEnvSchema.parse(privateEnv);
   

7. Create an empty ./src/db/schema.ts file

8. Copy the ./drizzle.config.ts from this repo to your project root.
   Remember to install dotenv:

   
   yarn add dotenv
   

9. Change the target option in tsconfig.json to es2017:

   
   {
     "compilerOptions": {
       "target": "es2017",
       ...
     }
   }
   

10. Add scripts
    Add the following scripts to the ./package.json file:

    
    {
      "scripts": {
        // This script will update the database schema
        "migrate": "drizzle-kit push:pg",
        // This script opens a GUI to manage the database
        "studio": "drizzle-kit studio"
      }
    }
    

    Remember to run yarn migrate after you make changes to the database schema, namely the ./src/db/schema.ts file.

11. Add pg-data to .gitignore
    
text
    ...
    pg-data/
