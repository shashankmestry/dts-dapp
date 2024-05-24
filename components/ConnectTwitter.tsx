"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Card from "./ui/Card";
import Button from "./ui/Button";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";

interface ConnectTwitterProps {
    currentStep: string,
    address: string,
    connectedHandle: string,
    setConnectedHandle: Dispatch<SetStateAction<string>>,
    setCurrentStep: Dispatch<SetStateAction<string>>,
}

const ConnectTwitter = ({ currentStep, address, connectedHandle, setConnectedHandle, setCurrentStep }: ConnectTwitterProps) => {
    const { data: session, status } = useSession();
    const [sessionHandle, setSessionHandle] = useState("")

    const handleTwitterConnect = () => {
        localStorage.setItem('currentStep', "2");
        signIn('twitter')
    }

    const handleNext = () => {
        setConnectedHandle(sessionHandle)
        setCurrentStep("3")
    }

   

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setSessionHandle(session.user.name)
        }
    }, [session])

    return (
        <>
            {currentStep == "2" ? (<Card>
                {!session ? (
                    <>
                    { connectedHandle != "" ? <p className="mb-2">Address is already connected with @{connectedHandle}</p> : <p className="mb-2 flex gap-2 items-center">Please connect <BsTwitterX /> to get handle for</p> }
                        
                        <p className="mb-4">{address}</p>
                        <div>
                            <Button onClick={() => handleTwitterConnect()}>
                                Connect <BsTwitterX className="ml-3" />
                            </Button>
                        </div>
                    </>
                ) : (<>
                    {
                        connectedHandle != "" && connectedHandle == sessionHandle ? (<>
                            <p>The Account is already connected with @{sessionHandle}</p>
                        </>) : (<>
                            <p className="mb-2 flex gap-2 items-center">Do you want to verify <Link href={`https://twitter.com/${sessionHandle}`} target="_blank" className="flex items-center bg-black/25 px-1 transition-all hover:bg-black/50">@{sessionHandle}</Link> for </p>
                            <p className="mb-4">{address} ?</p>
                        </>)
                    }
                    <div>
                        <Button variant="link" className="text-sm text-slate-300 hover:underline inline" onClick={() => signOut()}>Logout @{sessionHandle}</Button>
                    </div>
                </>)
                }
                <div className="h-8"></div>
                <div className="flex gap-4">
                    { (connectedHandle != "" || sessionHandle != "") && <Button onClick={() => handleNext()}>Continue</Button> }
                    <Button variant="secondary" onClick={() => setCurrentStep("1")}>Back</Button>
                </div>
            </Card>) : (<div>
                { connectedHandle != "" && <p>@{connectedHandle}</p> }
            </div>)}
        </>
    )
}

export default ConnectTwitter