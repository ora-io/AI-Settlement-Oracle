import { getAccount } from '@wagmi/core';
import { Address, getAddress, TransactionReceipt } from 'viem';

import store, { dispatch } from '@/store';
import { appActions } from '@/store/app/reducer';
import { getPublicClient } from './client';
import walletConfig from '@/constants/walletConfig';
import { getOAOAiContract, getOAOPromptsContract } from './contract';

function transformEstimateFee(fee: bigint) {
  const bigNumber = BigInt(fee.toString());
  return BigInt(Math.ceil(Number(bigNumber) / 1e14) * 1e14);
}

export async function getOAOAiEstimateFee(address: Address, mode: bigint, gasLimit: bigint) {
  const contract = await getOAOAiContract(address);
  return await contract.read.estimateFee([mode, gasLimit]);
}

const promptRequestEvent = async ({ address }: { address: Address }) => {
  // const { getState, dispatch } = await import('@/redux');
  const contract = await getOAOPromptsContract(address);
  console.log('start promptRequestEvent');

  const unWatch = contract.watchEvent.promptRequest({
    strict: true,
    onError: (error) => {
      console.log('Error promptRequest', error);
    },
    onLogs: async (logs) => {
      for (const item of logs) {
        const { requestId, sender } = item.args;
        const { address: account } = getAccount(walletConfig);

        if (getAddress(account || '0x') === getAddress(sender as string) && requestId) {
          console.log('promptRequestEvent', item, requestId);
          dispatch(appActions.setRequestId(String(requestId)));
          unWatch();
        }
      }
    }
  });
};

const promptsUpdatedEvent = async ({ address }: { address: Address }) => {
  // const { getState, dispatch } = await import('@/redux');
  const contract = await getOAOPromptsContract(address);

  console.log('start promptsUpdatedEvent');

  const unWatch = contract.watchEvent.promptsUpdated({
    strict: true,
    onLogs: async (logs) => {
      for (const item of logs) {
        const { requestId, output } = item.args;
        const appState = store.getState().app;

        if (String(requestId) === appState.requestId && output) {
          console.log('promptsUpdated', item);
          dispatch(appActions.setAiOutput(output));

          unWatch();
        }
      }
    }
  });
};

export const calculateAIResult = async ({ prompt }: { prompt: string }): Promise<TransactionReceipt> => {
  const address = '0xBC24514E541d5CBAAC1DD155187A171a593e5CF6';
  const modelId = 11; // LLAMA
  await promptRequestEvent({ address });
  await promptsUpdatedEvent({ address });

  const contract = await getOAOPromptsContract(address);

  const fee = await contract.read.estimateFee([BigInt(modelId)]);

  const hash = await contract.write.calculateAIResult([BigInt(modelId), prompt], { value: transformEstimateFee(fee) });

  const publicClient = await getPublicClient();

  const txReceipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log('txReceipt', txReceipt);

  return txReceipt;
};
