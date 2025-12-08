/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Metadata } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import Provider from './provider';
import Footer from './components/Footer';
import Nav from './components/Nav';
import './global.css';
import './index.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider>
          <div className="layout">
            <Nav />
            <div className="layout__content">{children}</div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
