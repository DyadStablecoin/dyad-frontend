import { getBuiltGraphSDK } from "../../.graphclient";

gql`query top100NFTs{
  dnfts(orderDirection: desc, orderBy: xp, first: 100) {
    id
    xp
  }
}`;

const sdk = getBuiltGraphSDK();

export const useGraphNfts = () => {
  return useQuery('', () => {
    sdk.top100NFTs();
  });
};
