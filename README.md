# Scaffold-Eth NX plugin

## Description

The Scaffold-Eth NX plugin allows you to easily integrate an instance of Scaffold-eth into your NX monorepo. Scaffold-eth is a framework for developing decentralized applications (dApps) on Ethereum, providing a set of tools and templates to accelerate the development process.

## Installation

In your NX root dir run:

```bash
npm install @scobru/scaffold-eth-nx
```

## Usage

In your NX root dir run:

1Generate scaffold-eth packages

```bash
nx generate  @scobru/scaffold-eth-nx:scaffold-eth
```

Install scaffold-eth running:

```bash
yarn install-{yourAppName}
```

Run Hardhat Chain:

```bash
nx run yourAppName:chain
```

Run Hardhat Deploy:

```bash
nx run yourAppName:deploy
```

Start NextJS App:

```bash
nx run yourAppName:start
```
