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
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      {address && (
        <div>
          Balance: {data?.formatted} {data?.symbol}
        </div>
      )}
      <HStack h={20} alignItems={"center"} justifyContent={"space-between"}>
        <Box style={{ fontWeight: "800", cursor: "pointer" }}>
          {/* <NavLink route={"/"}>CHC</NavLink> */}
        </Box>
        <HStack>
          <Box mr={6} style={{ fontWeight: "800", cursor: "pointer" }}>
            {/* <NavLink route={"/bets"}>Bets</NavLink> */}
          </Box>
          <Box mr={6}>
            {address ? (
              <Box cursor="pointer">
                <a onClick={() => disconnect()}>Disconnect</a>
              </Box>
            ) : (
              <ConnectButton />
            )}
          </Box>
          {/* <ToggleColorMode /> */}
        </HStack>
      </HStack>
    </Box>
  );
};
