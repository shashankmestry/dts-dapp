import { useDisconnect, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react"
import { Dispatch, SetStateAction, useEffect } from "react"
import Button from "./ui/Button"
import Card from "./ui/Card"

interface ConnectWalletProps {
    currentStep: string,
    setConnectedAddress: Dispatch<SetStateAction<string>>,
    setCurrentStep: Dispatch<SetStateAction<string>>,
}

const ConnectWallet = ({ currentStep, setConnectedAddress, setCurrentStep }: ConnectWalletProps) => {
    const { address, isConnected } = useWeb3ModalAccount()
    const { disconnect } = useDisconnect()
    const { open } = useWeb3Modal()

    useEffect(() => {
        if (address) {
            setConnectedAddress(address)
        } else {
            setConnectedAddress("")
        }
    }, [address, setConnectedAddress])

    return (
        <>{currentStep == "1" ? (<div>
            {isConnected ? <Card>
                <h2>Your ETH wallet is connected with </h2>
                <h2>{address}</h2>
                <div>
                    <Button variant="link" className="text-sm text-slate-300 hover:underline" onClick={() => disconnect()}>Disconnect Wallet</Button>
                </div>
                <div>
                    <div className="flex items-center gap-4 !mt-6">
                        <Button onClick={() => setCurrentStep("2")}>Continue</Button>
                    </div>
                </div>
            </Card> : <Card>
                <h2 className="mb-4">Your ETH wallet is not connected</h2>
                <div>
                    <Button onClick={() => open()}>Connect Wallet</Button>
                </div>
            </Card>}
        </div>) : (<div>
            { isConnected && <p>{address}</p> }
        </div>)}</>
    )
}

export default ConnectWallet