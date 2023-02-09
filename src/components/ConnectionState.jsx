import React from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { CURRENT_NETWORK } from "../consts/consts";
import Button from "./Button";

export const ConnectionState = ({ children }) => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  return isConnected ? (
    <>
      {chain.id === CURRENT_NETWORK.id ? (
        <div className="flex flex-col ">{children}</div>
      ) : (
        <div className="flex justify-center gap-2 mt-10">
          Please switch to the {CURRENT_NETWORK.name} Network!
          <Button onClick={() => switchNetwork(CURRENT_NETWORK.id)}>
            Switch
          </Button>
        </div>
      )}
    </>
  ) : (
    <div className="flex justify-center mt-10">Connect your wallet!</div>
  );
};
