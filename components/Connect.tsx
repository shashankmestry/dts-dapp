"use client";

import { Web3Modal } from "@/context/web3modal";
import { useCallback, useEffect, useState } from "react";
import ConnectWallet from "./ConnectWallet";
import ConnectBlock from "./ConnectBlock";
import ConnectTwitter from "./ConnectTwitter";
import { SessionProvider } from "next-auth/react";
import ConnectVerify from "./ConnectVerify";

const Connect = () => {
    const [currentStep, setCurrentStep] = useState("1")
    const [connectedAddress, setConnectedAddress] = useState("")
    const [connectedHandle, setConnectedHandle] = useState("")

    const loadConnectedHandle = useCallback(async () => {
        if (connectedAddress) {
            try {
                const res = await fetch(`/api/twitter/handle/?address=${connectedAddress}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if(data.handle) {
                    setConnectedHandle(data.handle)
                }
            } catch (error) {
                return "";
            }
        }
    }, [connectedAddress, setConnectedHandle])

    useEffect(() => {
        if (connectedAddress) {
            loadConnectedHandle()
        }
    }, [connectedAddress, loadConnectedHandle])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedValue = localStorage.getItem('currentStep');
            if (storedValue && storedValue != "") {
                setCurrentStep(storedValue);
                localStorage.setItem('currentStep', "");
            }
        }
    }, [setCurrentStep]);

    return (
        <div className="max-w-3xl mx-auto">
            <Web3Modal>
                <div className="relative">
                    <div className="absolute h-full top-4 left-[2px] w-0.5 bg-slate-800 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_150px,theme(colors.white))] -z-10 overflow-hidden after:absolute after:h-4 after:top-0 after:-translate-y-full after:left-0 after:w-0.5 after:bg-[linear-gradient(180deg,_transparent,_theme(colors.purple.500/.65)_25%,_theme(colors.purple.200)_50%,_theme(colors.purple.500/.65)_75%,_transparent)] after:animate-shine" aria-hidden="true"></div>
                    <ConnectBlock step="1" heading="Connect Wallet">
                        <ConnectWallet currentStep={currentStep} setConnectedAddress={setConnectedAddress} setCurrentStep={setCurrentStep} />
                    </ConnectBlock>
                    <SessionProvider>
                        <ConnectBlock step="2" heading="Connect X Account">
                            <ConnectTwitter currentStep={currentStep} address={connectedAddress} connectedHandle={connectedHandle} setConnectedHandle={setConnectedHandle} setCurrentStep={setCurrentStep} />
                        </ConnectBlock>
                    </SessionProvider>
                    <ConnectBlock step="3" heading="Verify Address with X account">
                        { currentStep == "3" ? <ConnectVerify address={connectedAddress} handle={connectedHandle} setCurrentStep={setCurrentStep} loadConnectedHandle={loadConnectedHandle} /> : <p></p> }
                    </ConnectBlock>
                </div>
            </Web3Modal>
        </div>
    )
}

export default Connect