# Scaffold-Eth NX plugin

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="200"></a>
<a alt="Scaffold-eth logo" href="https://scaffoldeth.io/" target="_blank" rel="noreferrer"><img src="https://scaffoldeth.io/logo.svg
" width="100"></a>

## Description

The Scaffold-Eth NX plugin allows you to easily integrate an instance of Scaffold-eth into your NX monorepo. Scaffold-eth is a framework for developing decentralized applications (dApps) on Ethereum, providing a set of tools and templates to accelerate the development process.

## Installation

In your NX root dir run:

```bash
npm install @scobru/scaffold-eth-nx
```

## Usage

In your NX root dir run:

1. Generate scaffold-eth packages

```bash
nx generate  @scobru/scaffold-eth-nx:scaffold-eth
```

2. Install scaffold-eth running:

```bash
yarn install-{yourAppName}
```

3. Run Hardhat Chain:

```bash
nx run yourAppName:chain
```

4. Run Hardhat Deploy:

```bash
nx run yourAppName:deploy
```

5. Start NextJS App:

```bash
nx run yourAppName:start
```
