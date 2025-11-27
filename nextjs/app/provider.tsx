'use client';

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'; // 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
  goerli,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { GoogleAnalytics } from 'nextjs-google-analytics';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, sepolia, goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'Konrad Gnat Portfolio',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const metadata = {
  title: 'Konrad Gnat Portfolio',
  description: 'Web Developer',
};

export default function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <GoogleAnalytics trackPageViews />
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
