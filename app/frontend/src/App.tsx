import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
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
import { useState } from 'react';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Books from './pages/Books';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Links from './pages/Links';
import Footer from './components/Footer';
import Nav from './components/Nav';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, sepolia, goerli],
  [
    alchemyProvider({
      apiKey: process.env.REACT_APP_ALCHEMY_ID as string,
    }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'Konrad Gnat Portfolio',
  projectId: process.env.REACT_APP_WALLET_CONNECT_ID as string,
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

function App() {
  return (
    <ChakraProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Router>
            <div className="layout">
              <Nav />
              <div className="layout__content">
                <Routes>
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/bookshelf" element={<Books />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/links" element={<Links />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/" element={<Home />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
