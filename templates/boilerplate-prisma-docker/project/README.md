## Getting Started with {{name}}

# Instructions

Next.js + Eslint + Typescript + Prisma + Docker

### Prerequisites

- Node.js
- npm (https://www.npmjs.com/)
- pnpm (https://pnpm.io/)
- Yarn (https://yarnpkg.com/lang/en/)
- Docker (https://www.docker.com/)
- Docker Compose (https://docs.docker.com/compose/)

### Usage

To get started, run the following commands:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Post Install Steps

```bash
pnpm add --save-dev husky
```

```bash
pnpm husky init
 ```

```bash
echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg
```

As an alternative you can create a script inside package.json

```bash
npm pkg set scripts.commitlint="commitlint --edit"
echo "pnpm commitlint \${1}" > .husky/commit-msg
```

### Test simple usage

For a first simple usage test of commitlint you can do the following:

```bash
npx commitlint --from HEAD~1 --to HEAD --verbose
```


### Development

Start the development server with `npm run dev` or `yarn dev` or `pnpm dev`.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
