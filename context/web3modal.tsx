'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = '562f5255651a82550c962ac9ca696bbf'

const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}

const metadata = {
    name: 'DTS - Score for web3 address',
    description: 'Check DTS, a score that verifies your onchain web3 strength for wallet address',
    url: 'https://dts.com', // origin must match your domain & subdomain
    icons: ['https://www.spad.xyz/favicon.ico']
}
// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
})

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    themeVariables: {
        '--w3m-accent': '#0f172a',
        // '--w3m-color-mix-strength': 10,
        '--w3m-border-radius-master': '1px'
    }
})

export function Web3Modal({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return children
}