# Exerdice

A dice rolling / activity tracking web app. Let the dice decide the duration of your daily activities and keep track of your progress.

Created in [React](https://react.dev/)/[TypeScript](https://www.typescriptlang.org/)/[Vite](https://vite.dev/) using [SQLocal](https://sqlocal.dev/) to store data locally in the browser origin private file system.

Designed to used on mobile devices

## 🚅 Quick start

1.  **Install the dependencies.**

    Navigate into the root directory and run `npm i` to install the necessary dependencies.

3.  **Run the application**

    Run `npm run dev` to run the application in dev mode at `http://localhost:5173`

3.  **View components library in storybook**

    Run `npm run storybook` to see your component's stories at `http://localhost:6006`

4. **Test stories**

    Run `npm run test-storybook` or run `npm run watch-test-storybook` to see test result.

5. **Build**

    Run `npm run build` to compile the application into the `dist` folder.

4. **Deploy**

    Run `yarn test-storybook` or run `yarn watch-test-storybook` to see test result.
## Screenshot

!["Screenshot roll page"](/screenshots/Screenshot_Roll.png)


## Techologies uses

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) Build tool
- [SQLocal](https://sqlocal.dev/) SQLite3 embedded in the browser origin private file system
- [Drizzle](https://orm.drizzle.team/) ORM for interfacing with SQLite WASM
- [Storybook](https://storybook.js.org/) Component library management

## 🔎 What's inside?

A quick look at the top-level files and directories included with this template.

    .
    ├── .storybook
    ├── node_modules
    ├── public
    ├── src
        |-- assets
        |-- components
        |-- db
        |-- helpers
        |-- hooks
        |-- providers
        |-- routes
        |-- stories
        |-- themes
        |-- types
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── drizzle.config.ts
    ├── .index.html
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.vite.json
    ├── vite.config.ts
    └── README.md

1.  **`.storybook`**: This directory contains Storybook's [configuration](https://storybook.js.org/docs/react/configure/overview) files.

2.  **`node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages).

3.  **`public`**: This directory contains assets linked in the index.html file

4.  **`src`**: This directory contains all of the code related to front end application.

5.  **`assets`**: This directory contains assets that are embedded in components

6.  **`components`**: This directory contains all of the code related to what components you want to build.

7.  **`db`**: This directory contains the drizzle schema and database connector

8.  **`helpers`**: This directory contains common helper methods

9.  **`hooks`**: This directory contains commonly used react hooks

10.  **`providers`**: This directory contains react context/provider pairs

11.  **`routes`**: This directory contains top level route components

12.  **`stories`**: This directory will contain all of the code related to what stories you want to test with your components.

13.  **`themes`**: This directory contains theme options

14.  **`.eslintrc.cjs`**: This file is the configuration file for [ESLint](https://eslint.org/), a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

15.  **`.gitignore`**: This file tells git which files it should not track or maintain during the development process of your project.

16.  **`.index.html`**: This is the HTML page that is served when generating a development or production build.

17. **`package-lock.json`**: This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(Do not change it manually).**

18. **`package.json`**: Standard manifest file for Node.js projects, which typically includes project specific metadata (such as the project's name, the author among other information). It's based on this file that npm will know which packages are necessary to the project.

19. **`tsconfig.json`**: This is the configuration file for [TypeScript](https://www.typescriptlang.org/) specifies the root files and the compiler options required to compile the project.

20. **`tsconfig.vite.json`**: This is the configuration file for [Vite](https://vitejs.dev/). Vite itself including its config is running on your computer inside Node, which is totally different environment (compared with browser) with different API's and constraints.

21. **`vite.config.ts`**: This is the configuration file for [Vite](https://vitejs.dev/), a build tool that aims to provide a faster and leaner development experience for modern web projects.

22. **`README.md`**: A text file containing useful reference information about the project.