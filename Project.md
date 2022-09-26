Project Description:

This project intends to explore Remix framework, an open sourced full stack web framework for React. Remix is popular because of its intent to focus on web fundamentals and delivery of dynamic webpages near to the speeds of Static Site Generators (SSG)

A basic Covid-19 Health declaration form is created whose requirements are captured here.

The default template of remix lists all the tech-stack they have included, read more here.

The following list entails technologies which were implemented as per needs of this project:
Chakra UI - modular and accessible component library for react
Tailwind - CSS Framework
Prisma - ORM for Node.js / Typescript 
Github Actions - creating workflows for CI / CD
SonarCloud - Static code analysis
Figma - design
fly.io - Deployment platform
Postgres - Database
Docker - An open platform for creating os-level virtualised applications
Typescript - Strongly typed programming language on Typescript
Vitest + React Testing Library

Setting up the project:

I would recommend to make use of gitpod to explore this project. Details are as mentioned here.

Following commands will help you set your project on local:

```
git clone https://github.com/sachinnair/remix-covid-health-declaration.git

cd remix-covid-health-declaration

npx remix init

```
Running below command will run a Postgres instance on your local. 

npm run docker

If you already have a postgres instance running on default port. Here you will find instructions to change the default port to a port of your choice.


Initial setup: npm run setup  
Run the first build: npm run build  
Start dev server: npm run dev



If you are into TDD driven development, you may start with writing tests using react-testing-library. The test runner used is Vitest. The promise I understand Vitest delivers is to have a single configuration for source code and test files, improved developer experience by faster runtime.

If you are testing frontend components, please make sure to set the default test [environment](https://vitest.dev/config/#environment) for Vitest. Because it defaults to node environment and one has to set it to jsdom / happy-dom for testing browser like environments.


To run the tests:

npm run test <— —options> <path to test file>



