import gql from 'graphql-tag'

export const pairsQuery = gql`
  {
    pairs {
      id
      reserveUSD
      totalSupply
    }
  }
`

export const allPricesQuery = gql`
  {
    tokens {
      id
      symbol
      name
      derivedBNB: derivedETH
      tokenDayData(orderBy: date, orderDirection: desc, first: 1) {
        id
        dailyTxns
        priceUSD
      }
    }
  }
`
