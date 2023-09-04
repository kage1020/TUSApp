<p align="center">
  <a href="https://tus-app.vercel.app">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./docs/logo-dark.drawio.svg">
      <img src="./docs/logo-light.drawio.svg" height="128">
    </picture>
  </a>
</p>

<p align="center">
  <a aria-label="Framework" href="https://nextjs.org">
    <img alt="" src="https://img.shields.io/badge/framework-next.js-red.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/kage1020/TUSApp/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/badge/license-mit-green.svg?style=for-the-badge&labelColor=000000">
  </a>
</p>

This is an unofficial utility app for learning stacks created by Taniguchi Lab members in TUS.

---

## Getting Started

Visit [https://tus-app.vercel.app](https://tus-app.vercel.app) to use this app.

## Features

- [ToDo List](https://tus-app.vercel.app/todo) (Coming Soon)
- [Pose Estimation with Unity](https://tus-app.vercel.app/pose) (Coming Soon)
- IN/OUT Management (Coming Soon)

## Development

### Prerequisites

When you want to develop this app, you need to install the following software.

- Node.js >= 16.8
- Python >= 3.8

When you use Todo List, you need to set up Supabase with creating Account.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/kage1020/TUSApp.git
   cd TUSApp
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. create `.env` file in root directory

   ```sh
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="secret"
   GITHUB_CLIENT_ID="*"
   GITHUB_CLIENT_SECRET="*"

   # Prisma
   DATABASE_URL="postgres://postgres:*@db.*.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
   ```

   env variables for NextAuth.js are required to use GitHub OAuth. Please refer to [here](https://qiita.com/kage1020/items/fca49e9b42b972b70b8c) for more information.

   env variables for Prisma are required to use Supabase. Please refer to [here](https://supabase.com/partners/integrations/prisma) for more information.

4. setup prisma for Supabase

   ```sh
   npm run prisma:generate
   npm run prisma:push
   ```

5. Install Python packages

   ```sh
   cd server
   pip install -r requirements.txt
   ```

6. run dev server

   ```sh
   # root directory
   npm run dev

   # server directory
   python main.py
   ```

## Architecture

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/architecture-dark.drawio.svg">
  <img src="./docs/architecture-light.drawio.svg">
</picture>

## License

See `LICENSE` for more information.

## References

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [NextAuth.js](https://next-auth.js.org)
- [Supabase](https://supabase.com)
- [Prisma](https://www.prisma.io)
- [YOLOv8](https://docs.ultralytics.com)
- [3d Pose GAN](https://github.com/DwangoMediaVillage/3dpose_gan) (Dwango Media Village)
- [Unity](https://unity.com), [UnityChan](https://unity-chan.com)

## Authors

- [@kage1020](https://github.com/kage1020)
- [@tus0inoue1007](https://github.com/tus0inoue1007)
