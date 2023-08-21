In order to run the test suite, do the following:

1. Ensure you have Node.js installed by running `node -v` in Terminal. If you don't have Node.js installed, you can download it [here](https://nodejs.org/en/download). You can also install it via `nvm`, a popular version manager.
2. Once you know you have Node.js installed, `cd` into the root directory and run `npm i`.
3. Once all dependencies have been installed, you can run the test suite by executing the command `npm run test`.

If you'd like to run the script directly, you can do so via a new Node instance:

1. From Terminal, in the root directory, run `node`. You should see a message resembling `Welcome to Node.js v20.5.1.` at the top of your Terminal window.
2. Next, import the script by typing `const { evolutionChain } = require('./index.js');`. You should now have access to the `evolutionChain` function.
3. Run the `evolutionChain` function and pass in the name of a Pokémon (e.g. Rattata). Don't forget the `await` keyword (we are calling an asynchronous function):
```
await evolutionChain('rattata');
```