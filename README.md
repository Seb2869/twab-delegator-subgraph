<p align="center">
  <a href="https://github.com/pooltogether/pooltogether--brand-assets">
    <img src="https://github.com/pooltogether/pooltogether--brand-assets/blob/977e03604c49c63314450b5d432fe57d34747c66/logo/pooltogether-logo--purple-gradient.png?raw=true" alt="PoolTogether Brand" style="max-width:100%;" width="200">
  </a>
</p>

<br />

## PoolTogether - TWAB Delegator subgraph

[![Tests](https://github.com/pooltogether/twab-delegator-subgraph/actions/workflows/main.yml/badge.svg)](https://github.com/pooltogether/twab-delegator-subgraph/actions/workflows/main.yml)

Subgraph to track events and data related to the TWAB Delegator contract.

## Development

### Templates

Generate subgraph templates using one of the following commands:

```
yarn prepare:rinkeby
yarn prepare:mainnet
yarn prepare:polygon
yarn prepare:avalanche
```

### Schemas

Generate schemas using one of the following commands:

```
yarn gen:rinkeby
yarn gen:mainnet
yarn gen:polygon
yarn gen:avalanche
```

### Tests

Run tests with the command: `yarn test`

## Deployment

### Deploy

Deploy using one of the following commands:

```
yarn deploy:rinkeby
yarn deploy:mainnet
yarn deploy:polygon
yarn deploy:avalanche
```

### Build and deploy

To build and deploy at once, use one of the following commands:

```
yarn all-rinkeby
yarn all-mainnet
yarn all-polygon
yarn all-avalanche
```

### Hosted Subgraphs

Subgraphs are hosted at the following URLs:
-   https://thegraph.com/hosted-service/subgraph/pooltogether/mainnet-twab-delegator
-   https://thegraph.com/hosted-service/subgraph/pooltogether/polygon-twab-delegator
-   https://thegraph.com/hosted-service/subgraph/pooltogether/avalanche-twab-delegator
-   https://thegraph.com/hosted-service/subgraph/pooltogether/rinkeby-twab-delegator
