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
    <div className="flex justify-around items-center mt-8 mb-8 mr-16 ml-16">
      <div>tvl</div>
      <div>dNFT floor</div>
      <div className="text-5xl font-bold">dyad</div>
      <div>app</div>
      <div>docs</div>
      <div>about</div>
      {address ? (
        <a onClick={() => disconnect()}>Disconnect</a>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
