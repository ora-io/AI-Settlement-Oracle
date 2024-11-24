# [AI Settlement Oracle](https://ora.io/ai-settlement-oracle)

## About

### Intro

This repository serves as a demo integration for AI Settlement Oracle, providing minimal code required to integrate the Oracle. It is designed to act as a direct integration guide, allowing developers to quickly understand and implement its functionality.

### Concept

AI Settlement Oracle is an application showcasing the capabilities of Onchain AI in resolving disputes. The Oracle provides unbiased, objective results using verifiable AI, designed to integrate seamlessly into prediction markets and similar decentralized applications.

Advantages:
- Autonomous Operation: Powered by ORA’s Optimistic Machine Learning and Onchain AI Oracle.
- Accuracy & Fairness: Immune to economic manipulation and herd behavior typical of traditional systems.
- Trustless Settlement: Ensures unbiased outcomes for any factual query.

### Workflow

AI Settlement Oracle contains two parts of interaction:

1. Parse Context:  
   The first interaction takes a question as input. The AI Settlement Oracle's server parses the web for relevant sources and content, condensing them into a truth context. This step ensures the gathered information is accurate and ready for onchain settlement.

2. Onchain Settlement:  
   The second interaction combines the truth context and helper prompts into a single prompt as input for the Onchain AI Oracle. The Onchain AI Oracle processes the prompt to generate the final truth, settling the dispute or query onchain.

## Develop Guide

1. Installation

```zsh
git clone https://github.com/ora-io/AI-Settlement-Oracle.git
cd AI-Settlement-Oracle

npm install
```

2. Set up Environment Variables

```zsh
cp .env.example .env
```

Populate the `.env` file with the following:

```zsh
VITE_SEARCH_API="http://xxxxxxxx"
VITE_SEARCH_APIKEY="xxxxxxx"
```

Note: Contact ORA team to obtain the API and API Key. You will need these key to access into the AI Settlement Oracle.

3. Start Development Server

```zsh
npm run dev
```

## Code Structure

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

## Contributing

We welcome contributions! To contribute:
	1.	Fork the repository.
	2.	Create a new branch for your feature/bugfix.
	3.	Commit your changes with clear messages.
	4.	Submit a pull request for review.

For major changes, please open an issue to discuss your ideas before implementation.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
