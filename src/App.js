import { WagmiConfig } from "wagmi";
import "./App.css";
import Home from "./components/Home";
import { NavBar } from "./components/layout/Navbar";
import { client, chains } from "./utils/wagmi-config";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import Example from "./components/Example";

function App() {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <div className="font-serif font-bold mr-16 ml-16 text-white">
            <NavBar />
            <div className="flex flex-col justify-center items-center m-10">
              <Home />
              {/* <Example /> */}
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
