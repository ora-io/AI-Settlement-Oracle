AI Settlement Oracle

```zsh
npm install

npm run dev
```

Responsible for the `/.env.example` file, create the `/.env` file;
populate it with the corresponding environment variables `VITE_SEARCH_API` and `VITE_SEARCH_APIKEY`.

```zsh
VITE_SEARCH_API="http://xxxxxxxx"
VITE_SEARCH_APIKEY="xxxxxxx"
```

# Code Structure

- **assets**: Stores image, SVG resources.

- **constants**

  - **abi**: Stores contract ABI files.
  - **config**: Stores configuration files.
  - **walletConfig**: Stores wallet configuration files.

- **services**

  - **clients**: Stores clients for search services.
  - **evm**: Stores services for EVM (Ethereum Virtual Machine), contract interactions.
  - **searchService**: Stores search services.

- **store**

  - **app**: Stores the application's state.
  - **hooks**: Stores custom hooks for the application.
  - **index**: Stores the main store of the application.

- **types**

  - **env.d.ts**: Stores the type definitions for environment variables.

- **App.tsx**: Demo application.
- **main.tsx**: Entry file for the application.
