'use client';

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleAnalytics } from 'nextjs-google-analytics';

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
      <GoogleAnalytics trackPageViews />
      {children}
    </ChakraProvider>
  );
}
