import { WagmiProvider } from 'wagmi';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Provider as ReduxProvider } from 'react-redux';

import store from './store';

import '@rainbow-me/rainbowkit/styles.css';

import walletConfig from '@/constants/walletConfig';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();

root.render(
  <ReduxProvider store={store}>
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#00f6ff',
            accentColorForeground: '#000000',
            borderRadius: 'medium'
          })}
        >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </ReduxProvider>
);
