# Introduce


這個網站是以之前風靡一時的手遊「Wordle」作為出發點，實作的同時也在想怎麼樣能讓遊戲更加有趣。於是，我們在Wordle這款遊戲中添加了多人對戰模式，網站支持兩個人在時間壓力下，比出誰的英文單字造詣更強，非常新奇。其他功能像是支持玩家登入系統，以及之前曾完成過的破關紀錄，都會存在統計資料後端。歡迎大家來一同對戰！

* 實作功能：使用者登入系統、單人遊玩、多人對戰、歷史遊玩紀錄（待補）


# Run the project

1. Install dependencies
   ```bash
   yarn
   ```
   ```bash
   sudo apt install python3
   pip3 install psycopg2-binary
   ```

2. Create `.env.local` file in the project root and add the following content:

   ```text

   AUTH_SECRET=<this can be any random string>

   ```

3. Start the database
   ```bash
   docker compose up -d
   ```
4. Run migrations
   ```bash
   yarn migrate
   ```
5. Load corpus
   ```bash
   cd setup
   python3 loadcorpus.py
   ```
6. Start the socket.io server
   ```bash
   cd src
   node server.js
   ```
7. Start the development server
   ```bash
   yarn dev
   ```
8. Open http://localhost:3000 in your browser

# Setup Guide

## Prettier and ESLint

1. Install prettier and prettier plugins
   ```bash
   yarn add -D prettier prettier-plugin-tailwindcss @trivago/prettier-plugin-sort-imports
   ```
2. Install eslint and eslint plugins
   ```bash
   yarn add -D eslint typescript @typescript-eslint/parser eslint-config-prettier @typescript-eslint/eslint-plugin
   ```
3. Copy and paste the `./prettierrc.cjs` and `./eslintrc.json` from this repo to your project root.

4. Add `format` script to `package.json`
   ```json
   {
     "scripts": {
       "format": "prettier --write ."
     }
   }
   ```
5. Check if the scripts work
   ```bash
   yarn format
   yarn lint
   ```
