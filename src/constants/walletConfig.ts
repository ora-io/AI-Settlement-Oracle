import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia } from 'wagmi/chains';

import { metaMaskWallet, okxWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';

import '@rainbow-me/rainbowkit/styles.css';

export default getDefaultConfig({
  appName: 'ai settlement oracle',
  projectId: '45c1b31bce08d990157958cce7eb6945',
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, okxWallet, injectedWallet]
    }
  ],
  chains: [arbitrumSepolia]
});
