import {
  getWalletClient as wagmiGetWalletClient,
  getPublicClient as wagmiGetPublicClient,
  GetWalletClientReturnType
} from '@wagmi/core';
import walletConfig from '@/constants/walletConfig';
import { ChainIdParameter } from '@wagmi/core/internal';
import { mainnet, sepolia } from 'wagmi/chains';

export async function getWalletClient(): Promise<GetWalletClientReturnType> {
  try {
    return await wagmiGetWalletClient(walletConfig);
  } catch {}
  return null as unknown as GetWalletClientReturnType;
}

export async function getPublicClient(chainId?: number) {
  if (!chainId && walletConfig.state.status === 'disconnected') {
    chainId = import.meta.env.VITE_ENV === 'production' ? mainnet.id : sepolia.id;
  }
  return wagmiGetPublicClient(walletConfig, {
    chainId: chainId as ChainIdParameter<typeof walletConfig>['chainId']
  });
}
