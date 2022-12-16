import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "teQjVlBzflYA4jvjOfPf-2qMe6O90RGV",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const ensContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";

export function addressSummary(address, length = 6) {
  if (address) {
    return `${address.slice(0, length)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  }
}

export async function getEnsName(address) {
  // return the first ens name that we can find
  const nfts = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [ensContractAddress],
  });

  try {
    return nfts.ownedNfts[0].title;
  } catch (e) {
    return "";
  }
}
