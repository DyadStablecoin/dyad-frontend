import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import * as React from 'react';
import { WagmiConfig } from 'wagmi';
import { chains, client } from '../wagmi';
import Navbar from '../components/Navbar';
import '../../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <NextHead>
          <title>DYAD</title>
        </NextHead>

        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
