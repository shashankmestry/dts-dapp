"use client";

import { Web3Modal } from "@/context/web3modal";
import FetchScore from "./FetchScore";
import Button from "./ui/Button";
import { useCallback, useEffect, useState } from "react";
import { useDisconnect, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ITrustScore } from "@/services/score.service";
import { fetchScore } from "@/services/helper";
import { isAddress } from "ethers";
import ScoreCard from "./ScoreCard";
import SectionHeader from "./layout/SectionHeader";
import { BsTwitterX } from "react-icons/bs";
import ButtonLink from "./ui/ButtonLink";

const Home = () => {
    const { address, isConnected } = useWeb3ModalAccount()
    const { disconnect } = useDisconnect()
    const { open } = useWeb3Modal()
    const [score, setScore] = useState<ITrustScore | null>(null)
    const [checking, setChecking] = useState(false)

    const loadScore = useCallback(async (address: string) => {
        setChecking(true)
        try {
            const data = await fetchScore(address);
            console.log(data)
            if(data) {
                setScore(data)
            } else {
                setScore(null)
            }
        } catch (error) {
            console.log(error)
            setScore(null)
        } finally {
            setChecking(false)
        }
    }, [])

    useEffect(() => {
        if (isAddress(address)) {
            loadScore(address)
        } else {
            setScore(null)
        }
    }, [address, loadScore])

    return (
        <Web3Modal>
            <SectionHeader title='Decentralized Trust Score' subTitle='Check DTS' description={ !isConnected ? 'You can check your Decentralized Trust Score by connecting wallet' : ''} />
            <div className="text-center">
                {
                    isConnected && address ? (<>
                        {score && <div className="max-w-sm mx-auto mb-10">
                            <ScoreCard score={score} />
                            { score.twitterHandle == "" && <div className="mt-4">
                                <p className="mb-4 text-sm">You can improve your score by connecting <BsTwitterX className="inline" /> account</p>
                                <ButtonLink href="/connect">Connect <BsTwitterX className="mx-2" /> Account</ButtonLink>
                            </div> }

                        </div>
                        }
                        { checking && <p className="mb-10">Please wait while we fetch your DTS</p> }
                        <h2 className="text-xl mb-2 text-slate-400">Your Wallet is Connected</h2>
                        <h3 className="text-base mb-2">{address}</h3>
                        <Button variant="transparent" onClick={() => disconnect()} >Disconnect Wallet</Button>
                    </>) : (<>
                        <h2 className="text-xl mb-4">Connect Wallet to check your DTS</h2>
                        <Button className="text-base" onClick={() => open()}>Connect Wallet</Button>
                    </>)
                }
            </div>
        </Web3Modal>
    )

    return (
        <div>Home</div>
    )
}

export default Home