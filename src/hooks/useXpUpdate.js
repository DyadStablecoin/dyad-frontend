import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { CURRENT_NETWORK } from "../consts/consts";
import axios from "axios";
import poolABI from "../abi/Pool.json";
import dnftABI from "../abi/dNFT.json";

const TENDERLY_FORK_API = `https://api.tenderly.co/api/v1/account/${process.env.REACT_APP_TENDERLY_USER}/project/${process.env.REACT_APP_TENDERLY_PROJECT}/fork`;

const opts = {
  headers: {
    "X-Access-Key": process.env.REACT_APP_TENDERLY_ACCESS_KEY,
  },
};

export default function useXpUpdate(tokenId) {
  const [update, setUpdate] = useState();

  useEffect(() => {
    async function updateXP() {
      if (!tokenId) return;

      const gp = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_INFURA
      );
      const blockNumber = await gp.getBlockNumber();
      const body = {
        network_id: CURRENT_NETWORK.id,
        block_number: blockNumber,
      };
      console.log(body);
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
      console.log(forkId);
      const forkRPC = `https://rpc.tenderly.co/fork/${forkId}`;
      const provider = new ethers.providers.JsonRpcProvider(forkRPC);
      const signer = provider.getSigner();

      const params = [
        ["0xEd6715D2172BFd50C2DBF608615c2AB497904803"],
        ethers.utils.hexValue(100), // hex encoded wei amount
      ];
      await provider.send("tenderly_addBalance", params);

      const pool = new ethers.Contract(
        "0x67488Df72673d85c42a83e5ECAdBBEeA16C01A22",
        poolABI["abi"],
        signer
      );
      const dnft = new ethers.Contract(
        "0x93c23f661F11E5cF62791294E03ee353AD1009a3",
        dnftABI["abi"],
        signer
      );

      const unsignedTx = await pool.populateTransaction.sync();
      const transactionParameters = [
        {
          to: pool.address,
          from: "0xEd6715D2172BFd50C2DBF608615c2AB497904803",
          data: unsignedTx.data,
          gas: ethers.utils.hexValue(3000000),
          gasPrice: ethers.utils.hexValue(1),
          value: ethers.utils.hexValue(0),
        },
      ];
      const txHash = await provider.send(
        "eth_sendTransaction",
        transactionParameters
      );
      let res = await dnft.idToNft(tokenId);
      console.log(res);
      setUpdate(res);

      const TENDERLY_FORK_ACCESS_URL = `https://api.tenderly.co/api/v1/account/${process.env.REACT_APP_TENDERLY_USER}/project/${process.env.REACT_APP_TENDERLY_PROJECT}/fork/${forkId}`;
      await axios.delete(TENDERLY_FORK_ACCESS_URL, opts);
    }
    updateXP();
  }, [tokenId]);

  return { update };
}
