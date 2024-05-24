"use client";

import { Web3Modal } from "@/context/web3modal"
import Button from "./ui/Button"
import { useDisconnect, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react"
import FetchScore from "./FetchScore";

const CheckScore = () => {
    const { address, isConnected } = useWeb3ModalAccount()
    const { disconnect } = useDisconnect()
    const { open } = useWeb3Modal()
    return (
        <Web3Modal>
            <div className="text-center">
                {
                    isConnected && address ? (<>
                        <h2 className="text-xl mb-4">Your Wallet is connected</h2>
                        <FetchScore connectedAddress={address} />
                    </>) : (<>
                        <h2 className="text-xl mb-4">Connect Wallet to check your DTS</h2>
                        <Button className="text-base" onClick={() => open()}>Connect Wallet</Button>
                    </>)
                }
            </div>
        </Web3Modal>
    )
}

export default CheckScore