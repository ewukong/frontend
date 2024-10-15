export type ContractSolanaWukongxNftStake = {
  version: '0.1.0'
  name: 'contract_solana_wukongx_nft_stake'
  instructions: [
    {
      name: 'initialize'
      accounts: [
        {
          name: 'programSystemAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'nftVaultManager'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'preStakeNft'
      accounts: [
        {
          name: 'nftVaultManager'
          isMut: false
          isSigner: false
        },
        {
          name: 'nftVaultAta'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'stakedNftData'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'stakeNft'
      accounts: [
        {
          name: 'nftVaultAta'
          isMut: true
          isSigner: false
        },
        {
          name: 'nftVaultManager'
          isMut: false
          isSigner: false
        },
        {
          name: 'nftTokenMetadata'
          isMut: false
          isSigner: false
        },
        {
          name: 'nftProgramId'
          isMut: false
          isSigner: false
        },
        {
          name: 'stakedNftData'
          isMut: true
          isSigner: false
        },
        {
          name: 'userTokenAta'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'eventAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'program'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'unstakeNft'
      accounts: [
        {
          name: 'nftVaultAta'
          isMut: true
          isSigner: false
        },
        {
          name: 'nftVaultManager'
          isMut: false
          isSigner: false
        },
        {
          name: 'stakedNftData'
          isMut: true
          isSigner: false
        },
        {
          name: 'userTokenAta'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'eventAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'program'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    }
  ]
  accounts: [
    {
      name: 'programSystemAccount'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'owner'
            type: 'publicKey'
          },
          {
            name: 'admin'
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'userStakeData'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'stakeAmount'
            type: 'u16'
          }
        ]
      }
    },
    {
      name: 'stakedNftData'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'nftOwner'
            type: 'publicKey'
          }
        ]
      }
    }
  ]
  events: [
    {
      name: 'StakeNftEvent'
      fields: [
        {
          name: 'user'
          type: 'publicKey'
          index: false
        },
        {
          name: 'tokenMint'
          type: 'publicKey'
          index: false
        },
        {
          name: 'verified'
          type: 'bool'
          index: false
        },
        {
          name: 'collectionId'
          type: 'publicKey'
          index: false
        }
      ]
    },
    {
      name: 'UnstakeNftEvent'
      fields: [
        {
          name: 'user'
          type: 'publicKey'
          index: false
        },
        {
          name: 'tokenMint'
          type: 'publicKey'
          index: false
        }
      ]
    }
  ]
}

export const stakeIdl: ContractSolanaWukongxNftStake = {
  version: '0.1.0',
  name: 'contract_solana_wukongx_nft_stake',
  instructions: [
    {
      name: 'initialize',
      accounts: [
        {
          name: 'programSystemAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftVaultManager',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'preStakeNft',
      accounts: [
        {
          name: 'nftVaultManager',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftVaultAta',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakedNftData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'stakeNft',
      accounts: [
        {
          name: 'nftVaultAta',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftVaultManager',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftTokenMetadata',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftProgramId',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakedNftData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userTokenAta',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'eventAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'program',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'unstakeNft',
      accounts: [
        {
          name: 'nftVaultAta',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftVaultManager',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakedNftData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userTokenAta',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'eventAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'program',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'programSystemAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'admin',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'userStakeData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'stakeAmount',
            type: 'u16',
          },
        ],
      },
    },
    {
      name: 'stakedNftData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'nftOwner',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'StakeNftEvent',
      fields: [
        {
          name: 'user',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'tokenMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'verified',
          type: 'bool',
          index: false,
        },
        {
          name: 'collectionId',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'UnstakeNftEvent',
      fields: [
        {
          name: 'user',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'tokenMint',
          type: 'publicKey',
          index: false,
        },
      ],
    },
  ],
}
