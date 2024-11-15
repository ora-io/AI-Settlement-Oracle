import { Address, getContract } from 'viem';

import { OAO_AI_ABI, OAO_PROMPTS_ABI } from '@/constants/abi/oao';
import { getPublicClient, getWalletClient } from './client';

export async function getOAOPromptsContract(address: Address) {
  const walletClient = await getWalletClient();
  const publicClient = await getPublicClient();

  const contract = getContract({
    address,
    abi: OAO_PROMPTS_ABI,
    client: {
      public: publicClient,
      wallet: walletClient
    }
  });
  return contract;
}

export async function getOAOAiContract(address: Address) {
  const walletClient = await getWalletClient();
  const publicClient = await getPublicClient();

  const contract = getContract({
    address,
    abi: OAO_AI_ABI,
    client: {
      public: publicClient,
      wallet: walletClient
    }
  });
  return contract;
}
