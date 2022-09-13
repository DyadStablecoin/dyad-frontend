import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
// import { ToggleColorMode } from './ToggleColorMode'
// import { NavLink } from "./NavLink";
import { useBalance } from "wagmi";

export const NavBar = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

  return (
    <div className="flex justify-around items-center mt-8 mb-8">
      <div>tvl: $50,000,000</div>
      <div>dNFT floor: $15,000</div>
      <div className="text-5xl font-bold">dyad</div>
      <div>app</div>
      <div>docs</div>
      <div>about</div>
      {address ? (
        <a className="cursor-pointer" onClick={() => disconnect()}>
          Disconnect
        </a>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
