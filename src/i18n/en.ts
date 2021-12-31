export const en = {
  translation: {
    menu: { home: 'Home', about: 'About', roadmap: 'Roadmap', team: 'Team' },
    mintButton: {
      short: {
        notConnected: 'Mint',
        fetching: 'Connecting...',
        disabled: 'Invalid Wallet',
        whitelist: {
          enabled: 'Mint',
          disabled: 'Mint Limit Reached',
        },
        free: {
          enabled_one: 'Mint (1 mint left)',
          enabled_other: 'Mint ({{count}} mints left)',
          disabled: 'Mint Limit Reached',
        },
      },
      long: {
        notConnected: 'Mint your pxMythics genesis NFT',
        fetching: 'Connecting...',
        disabled: 'Invalid Wallet',
        whitelist: {
          enabled: 'Mint your pxMythics genesis NFT',
          disabled: 'Mint Limit Reached',
        },
        free: {
          enabled_one: 'Mint your pxMythics genesis NFT (1 mint left)',
          enabled_other: 'Mint your pxMythics genesis NFT ({{count}} mints left)',
          disabled: 'Mint Limit Reached',
        },
      },
    },
    mintModal: {
      altGif: 'minting...',
      altCheckmark: 'done',
      mintingText: 'The power of the gods is yours to claim...',
      mintingSubtext: 'are you ready?',
      approvedText: 'A mythic being has awakened within your wallet',
    },
    alert: {
      invalidChain:
        'You are currently on {{invalidNetworkName}} (chain id: {{invalidNetworkId}}), please change network to {{validNetworkName}} (chain id: {{validNetworkId}})',
      or: 'or ',
    },
  },
};
