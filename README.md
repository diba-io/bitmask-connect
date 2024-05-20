## Using Yarn to Compile the JS Library

To include the JS library in your project, you can follow these steps:

1. Make sure you have [Yarn](https://yarnpkg.com/) installed on your system.
2. Open a terminal and navigate to your project directory.
3. Run the following command to install the necessary dependencies:

```bash
yarn install
```

4. Once the dependencies are installed, you can compile the JS library by running the following command:

```bash
yarn compile
```

This will generate the compiled library file, usually named `index.js`, in your project directory.

5. Finally, you can add the compiled library file to your project by importing it in your code:

```javascript
import library from "./index.js";
```

Make sure to adjust the file path if necessary.

That's it! You have successfully compiled and added the JS library to your project using Yarn.
