#!/usr/bin/env node

import path from "node:path";
import {fileURLToPath} from "node:url";
import {cp, readFile, writeFile} from "node:fs/promises";
import {glob} from "glob";
import color from "picocolors";
import prompts from "prompts";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {exec} from "child_process"; // Importa exec de child_process para ejecutar comandos de terminal

// List of templates
const TEMPLATES = [
  {
    title: "Boilerplate authentication with Next.js + Shadcn/ui + Prisma + Docker",
    value: "boilerplate-prisma-docker",
  },
  {
    title: "Boilerplate of authentication with Next.js + Shadcn/ui + Prisma + Docker + Next-auth",
    value: "boilerplate-auth",
  },
  {
    title: "Next.js + ESLint + TypeScript + Shadcn/ui",
    value: "next-eslint-ts-shadcn",
  },
  {
    title: "Next.js + ESLint + TypeScript + Tailwind",
    value: "next-eslint-ts-tw",
  },
  {
    title: "React (vite) + ESLint + TypeScript + Tailwind",
    value: "react-eslint-ts-tw",
  },
];

// List of extras
const EXTRAS = {
  "next-eslint-ts-shadcn": [
    {
      title: "Mercado Pago",
      value: "mercadopago",
    },
    {
      title: "Kinde Auth",
      value: "kinde",
    },
    {
      title: "Clerk Auth",
      value: "clerk",
    },
    {
      title: "Auth0",
      value: "auth0",
    },
    {
      title: "Supabase",
      value: "supabase",
    },
    {
      title: "libSQL + Drizzle",
      value: "libsql",
    },
  ],
  "next-eslint-ts-tw": [
    {
      title: "Mercado Pago",
      value: "mercadopago",
    },
    {
      title: "Kinde Auth",
      value: "kinde",
    },
    {
      title: "Clerk Auth",
      value: "clerk",
    },
    {
      title: "Auth0",
      value: "auth0",
    },
    {
      title: "Supabase",
      value: "supabase",
    },
    {
      title: "libSQL + Drizzle",
      value: "libsql",
    },
  ],
  "boilerplate-auth": [
    {
      title: "Mercado Pago",
      value: "mercadopago",
    },
    {
      title: "Kinde Auth",
      value: "kinde",
    },
    {
      title: "Clerk Auth",
      value: "clerk",
    },
    {
      title: "Auth0",
      value: "auth0",
    },
    {
      title: "Supabase",
      value: "supabase",
    },
    {
      title: "libSQL + Drizzle",
      value: "libsql",
    },
  ],
  "boilerplate-prisma-docker": [
    {
      title: "Mercado Pago",
      value: "mercadopago",
    },
    {
      title: "Kinde Auth",
      value: "kinde",
    },
    {
      title: "Clerk Auth",
      value: "clerk",
    },
    {
      title: "Auth0",
      value: "auth0",
    },
    {
      title: "Supabase",
      value: "supabase",
    },
    {
      title: "libSQL + Drizzle",
      value: "libsql",
    },
  ],
};

// Specify CLI arguments
const args = yargs(hideBin(process.argv)).options({
  name: {
    alias: "n",
    type: "string",
    description: "Name of the project",
  },
  template: {
    alias: "t",
    type: "string",
    description: "Template to use",
  },
});

// Override arguments passed on the CLI
prompts.override(args.argv);

async function main() {
  // Get the initial values for the prompts
  const {
    _: [initialName, initialProject],
  } = await args.argv;

  // Create the project prompt
  const project = await prompts(
    [
      {
        type: "text",
        name: "name",
        message: "What is the name of your project?",
        initial: initialName || "cli-project",
        validate: (value) => {
          if (value.match(/[^a-zA-Z0-9-_]+/g))
            return "Project name can only contain letters, numbers, dashes and underscores";

          return true;
        },
      },
      {
        type: "select",
        name: "template",
        message: `Which template would you like to use?`,
        initial: initialProject || 0,
        choices: TEMPLATES,
      },
    ],
    {
      onCancel: () => {
        console.log("\nBye 👋\n");

        process.exit(0);
      },
    },
  );

  // Get the template folder for the selected template
  const template = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "templates",
    project.template,
  );

  // Get the destination folder for the project
  const destination = path.join(process.cwd(), project.name);

  // Get the extras for the selected template
  let extras = [];

  if (EXTRAS[project.template]) {
    const {extras: results} = await prompts({
      type: "multiselect",
      name: "extras",
      message: "Which extras would you like to add?",
      choices: EXTRAS[project.template],
    });

    // Assign to variable
    extras = results;
  }

  // Copy files from the template folder to the current directory
  await cp(path.join(template, "project"), destination, {recursive: true});

  for await (const extra of extras) {
    // Copy files from the extra folder to the current directory
    await cp(path.join(template, "extras", extra), destination, {recursive: true});
  }

  // Get all files from the destination folder
  const files = await glob(`**/*`, {nodir: true, cwd: destination, absolute: true});

  // Read each file and replace the tokens
  for await (const file of files) {
    const data = await readFile(file, "utf8");
    const draft = data.replace(/{{name}}/g, project.name);

    await writeFile(file, draft, "utf8");
  }

  // Log outro message
  console.log("\n✨ Project created ✨");
  console.log(`\n${color.yellow(`Next steps:`)}\n`);
  console.log(`${color.green(`cd`)} ${project.name}`);
  console.log(`${color.green(`pnpm`)} install`);
  console.log(`${color.green(`pnpm`)} dev`);

  // Extras log
  if (extras.length) {
    console.log(
      `\nCheck out ${color.italic(
        extras.map((extra: string) => `${extra.toUpperCase()}.md`).join(", "),
      )} for more info on how to use it.`,
    );
  }

  // Initialize Git repository
  await initializeGitRepository(destination);
}

async function initializeGitRepository(destination) {
  return new Promise((resolve, reject) => {
    exec(`git init ${destination}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error al inicializar el repositorio Git: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Error al inicializar el repositorio Git: ${stderr}`);
        return;
      }
      resolve(stdout.trim());
    });
  }).then((result) => {
    console.log("✔️ Repositorio Git inicializado correctamente.");
    return result;
  });
}

// Run the main function
main().catch(console.error);
