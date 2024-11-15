export const OAO_AI_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'input',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'callbackContract',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'functionSelector',
        type: 'bytes4'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'gasLimit',
        type: 'uint64'
      }
    ],
    name: 'AICallbackRequest',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'invoker',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'output',
        type: 'bytes'
      }
    ],
    name: 'AICallbackResult',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      }
    ],
    name: 'claimModelRevenue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'gasLimit',
        type: 'uint256'
      }
    ],
    name: 'estimateFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'gasPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      }
    ],
    name: 'getModel',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'modelHash',
            type: 'bytes32'
          },
          {
            internalType: 'bytes32',
            name: 'programHash',
            type: 'bytes32'
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'receiverPercentage',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'accumulateRevenue',
            type: 'uint256'
          }
        ],
        internalType: 'struct AIOracle.ModelData',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'output',
        type: 'bytes'
      }
    ],
    name: 'invokeCallback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'modelIDs',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'opml',
    outputs: [
      {
        internalType: 'contract IOpml',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'outputOfRequest',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'input',
        type: 'bytes'
      },
      {
        internalType: 'address',
        name: 'callbackContract',
        type: 'address'
      },
      {
        internalType: 'bytes4',
        name: 'functionSelector',
        type: 'bytes4'
      },
      {
        internalType: 'uint64',
        name: 'gasLimit',
        type: 'uint64'
      }
    ],
    name: 'requestCallback',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'requests',
    outputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'input',
        type: 'bytes'
      },
      {
        internalType: 'address',
        name: 'callbackContract',
        type: 'address'
      },
      {
        internalType: 'bytes4',
        name: 'functionSelector',
        type: 'bytes4'
      },
      {
        internalType: 'uint64',
        name: 'gasLimit',
        type: 'uint64'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'server',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256'
      }
    ],
    name: 'setModelFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      }
    ],
    name: 'setModelReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'receiverPercentage',
        type: 'uint256'
      }
    ],
    name: 'setModelReceiverPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'modelHash',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 'programHash',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'receiverPercentage',
        type: 'uint256'
      }
    ],
    name: 'updateModel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      }
    ],
    name: 'updateResult',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'modelId',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'modelHash',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 'programHash',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'receiverPercentage',
        type: 'uint256'
      }
    ],
    name: 'uploadModel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

export const OAO_PROMPTS_ABI = [
  {
    inputs: [{ internalType: 'contract IAIOracle', name: '_aiOracle', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      { internalType: 'contract IAIOracle', name: 'expected', type: 'address' },
      { internalType: 'contract IAIOracle', name: 'found', type: 'address' }
    ],
    name: 'UnauthorizedCallbackSource',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'requestId', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'modelId', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'prompt', type: 'string' }
    ],
    name: 'promptRequest',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'requestId', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'output', type: 'string' },
      { indexed: false, internalType: 'bytes', name: 'callbackData', type: 'bytes' }
    ],
    name: 'promptsUpdated',
    type: 'event'
  },
  {
    inputs: [],
    name: 'aiOracle',
    outputs: [{ internalType: 'contract IAIOracle', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'requestId', type: 'uint256' },
      { internalType: 'bytes', name: 'output', type: 'bytes' },
      { internalType: 'bytes', name: 'callbackData', type: 'bytes' }
    ],
    name: 'aiOracleCallback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'modelId', type: 'uint256' },
      { internalType: 'string', name: 'prompt', type: 'string' }
    ],
    name: 'calculateAIResult',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'callbackGasLimit',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'modelId', type: 'uint256' }],
    name: 'estimateFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'requestId', type: 'uint256' }],
    name: 'isFinalized',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'requests',
    outputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint256', name: 'modelId', type: 'uint256' },
      { internalType: 'bytes', name: 'input', type: 'bytes' },
      { internalType: 'bytes', name: 'output', type: 'bytes' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'modelId', type: 'uint256' },
      { internalType: 'uint64', name: 'gasLimit', type: 'uint64' }
    ],
    name: 'setCallbackGasLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;
