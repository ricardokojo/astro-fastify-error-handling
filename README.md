# # astro-fastify-error-handling

This repository was created to demonstrate a problem found with Astro + Fastify integration. When an error occurs inside an Astro component, it doesn't fall into the error handler set with Fastify. However, if it happens inside an API endpoint, defined by a Typescript file, the desired outcome does happen.

## What does this repository contain

It contains a minimal template Astro project, created by running `npm create astro@3.1.6 <project-name> --template minimal`, with the following modifications:
- added Fastify integration following [Astro official docs](https://docs.astro.build/en/guides/integrations-guide/node/) (manually);
- added [custom error handler](https://www.fastify.io/docs/latest/Reference/Server/#seterrorhandler);
- added logger options on Fastify;
- created `/api` endpoint on Astro;
- threw errors on `pages/index.astro` and `pages/api.ts`.

## How to reproduce the error 💥

```sh
# install dependencies
npm i

# build Astro (generates middleware used by Fastify Middie)
npm run build

# run Fastify server
node src/index.mjs
```

You should be able to access `localhost:8080` and `localhost:8080/api`:
- Note that `localhost:8080` does not show the custom error 500 page, nor logs the error to the log file;
- On the other hand, `localhost:8080/api` does both.

## More relevant information

Tests ran with the following setup:

| Lib | Version |
|---|---|
| [Node](https://nodejs.org) | 16.14.2 |
| [NPM](https://www.npmjs.com/) | 8.5.0 |
| [Astro](https://astro.build/) | 2.6.5 |
| [Fastify](https://www.fastify.io/) | 4.18.0 |
| [@fastify/middie](https://github.com/fastify/middie) | 8.3.0 |
| [@astrojs/node](https://github.com/withastro/astro/tree/main/packages/integrations/node) | 5.2.0 |
