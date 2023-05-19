# 🛢 JetSwap Frontend

This project contains the main features of the JetSwap application.


## Overview

Official frontend repo of [jetswap.finance](https://jetswap.finance). The #1 AMM and yield farm on BSC and Polygon.


## To Run

```
yarn install
yarn start
```

The app will be running at http://localhost:3000/
<br/><br/>

# Deployment Guide


## 1. Contract Deployment

First of all, deploy JetswapFactory, MasterChef, WINGS PEB20 token and Pairs contracts.
<br/><br/>


## 2. Deploy Subgraph

Go to [Jetswap-subgraph](https://github.com/Smart-Cookie-Group/jetswap-subgraph) repo and follow the instruction there, after deploying subgraph proceed to step 3.
<br/><br/>

## 3. Deploy Info Portal at [info.jetswap.finance](https://info.jetswap.finance)

Go to [Jetswap-info](we) repo and follow the instruction there, after deploying subgraph proceed to step 4.
<br/><br/>

## 4. Deploy Exchange at [exchange.jetswap.finance](http://exchange.jetswap.finance/)

Go to [Jetswap-exchange](https://github.com/Smart-Cookie-Group/jetswap-exchange) repo and follow the instruction there, after deploying subgraph proceed to step 5.
<br/><br/>

## 5. Deploy front-end repo at [jetswap.finance](https://jetswap.finance)
After updating and deploying all parts of the jetswap ecosystem, rightnow comes the last part which is updating front-end repo and deploying it.

First we need to update contracts addresses in different parts of the repo:
<br/>

### 5.1. Update contracts addresses in contracts.ts
Go to ``` src/config/constants/contracts.ts ``` and update the following addresses:
- masterChef [at 56 chainID]
- No need to redeploy the multicall contract so leave it as it is.
<br/>

### 5.2. Update WINGS address in tokens.ts
Go to ``` src/config/constants/tokens.ts ``` and update the following token address:
- WINGS [at 56 chainID]
<br/>

### 5.3. Update Pools in pools.ts
Go to ``` src/config/constants/pools.ts ``` and update the following pools addresses:
- WINGS Pool [at 56 chainID]
- Jets Pool [at 56 chainID]
<br/>

### 5.3. Update Farms in farms.ts
Go to ``` src/config/constants/farms.ts ``` and update the each farm with its corresponding contract address addresses, update each lp with its JetswapPair contract address at chainID 56.
<br/>

### 5.4. Update Subgraph link
Go to ``` src/apollo/client.js ``` and update the uri link to match the link of the newly deployed subgraph like this:
```
uri: 'https://api.thegraph.com/subgraphs/name/nas-pang/pancakeswap' --> uri: 'https://api.thegraph.com/subgraphs/name/username/subgraph-name'
```
<br/>

### 5.5. Build project and Deploy
After you finished all necessary modifications, go to project root. Run these commands to build.
``` 
yarn 
yarn build
```

After building completion, you will have a deployable build folder at the root called ``` build ```..
<br/>






