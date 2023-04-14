import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface IQueryProvider {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const QueryProvider: React.FC<IQueryProvider> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
