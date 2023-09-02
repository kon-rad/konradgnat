/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import Head from 'next/head';
import Provider from './provider';
import Footer from './components/Footer';
import Nav from './components/Nav';
import './global.css';
import './index.css';

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('inside layout.tsx');
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
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
