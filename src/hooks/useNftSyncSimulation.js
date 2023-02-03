import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { CURRENT_NETWORK } from "../consts/consts";
import axios from "axios";
import poolABI from "../abi/Pool.json";
import dnftABI from "../abi/dNFT.json";
import { CONTRACT_POOL, CONTRACT_dNFT } from "../consts/contract";
import { useAccount } from "wagmi";

const TENDERLY_FORK_API = `https://api.tenderly.co/api/v1/account/${process.env.NEXT_PUBLIC_TENDERLY_USER}/project/${process.env.NEXT_PUBLIC_TENDERLY_PROJECT}/fork`;

const opts = {
  headers: {
    "X-Access-Key": process.env.NEXT_PUBLIC_TENDERLY_ACCESS_KEY,
  },
};

// simulate a sync call for a specific nft
export default function useNftSyncSimulation(tokenId) {
  const { address } = useAccount();
  const [nftAfterSimulation, setNftAfterSimulation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function updateXP() {
      if (!tokenId || !address) return;

      setIsLoading(true);
      const gp = new ethers.providers.JsonRpcProvider(
        `https://${CURRENT_NETWORK}.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
      );
      const blockNumber = await gp.getBlockNumber();
      const body = {
        network_id: CURRENT_NETWORK.id,
        block_number: blockNumber,
      };

      let forkId;
      await axios
        .post(TENDERLY_FORK_API, body, opts)
        .then((res) => {
          console.log(
            `Forked with fork ID ${res.data.simulation_fork.id}. Check the Dashboard!`
          );
          forkId = res.data.simulation_fork.id;
        })
        .catch((err) => console.log(err));

      const forkRPC = `https://rpc.tenderly.co/fork/${forkId}`;
      const provider = new ethers.providers.JsonRpcProvider(forkRPC);
      const signer = provider.getSigner();

      const pool = new ethers.Contract(CONTRACT_POOL, poolABI["abi"], signer);
      const dnft = new ethers.Contract(CONTRACT_dNFT, dnftABI["abi"], signer);

      const unsignedTx = await pool.populateTransaction.sync();
      const transactionParameters = [
        {
          to: pool.address,
          from: address,
          data: unsignedTx.data,
          gas: ethers.utils.hexValue(3000000),
          gasPrice: ethers.utils.hexValue(1),
          value: ethers.utils.hexValue(0),
        },
      ];
      await provider.send("eth_sendTransaction", transactionParameters);
      let res = await dnft.idToNft(tokenId);
      setNftAfterSimulation(res);
      setIsLoading(false);

      const TENDERLY_FORK_ACCESS_URL = `https://api.tenderly.co/api/v1/account/${process.env.NEXT_PUBLIC_TENDERLY_USER}/project/${process.env.NEXT_PUBLIC_TENDERLY_PROJECT}/fork/${forkId}`;
      await axios.delete(TENDERLY_FORK_ACCESS_URL, opts);
    }
    updateXP();
  }, [tokenId]);

  return { nftAfterSimulation, isLoading };
}
