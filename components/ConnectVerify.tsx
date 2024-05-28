import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"
import Button from "./ui/Button"
import Card from "./ui/Card"
import Message from "./ui/Message"
import ButtonLink from "./ui/ButtonLink"

interface ConnectVerifyProps {
    address: string,
    handle: string,
    setCurrentStep: Dispatch<SetStateAction<string>>,
    loadConnectedHandle: Function
}

const ConnectVerify = ({ address, handle, setCurrentStep, loadConnectedHandle }: ConnectVerifyProps) => {
    const [processing, setProcessing] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState({
        type: "",
        show: false,
        title: "",
        description: ""
    })

    const verifyHandle = async (handle: string) => {
        setProcessing(true)
        try {
            const res = await fetch('/api/twitter/handle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address, handle }),
            });

            const data = await res.json();
            await loadConnectedHandle()
            setMessage({
                type: 'success',
                show: true,
                title: "Success!",
                description: "Account verified successfully.",
            })
            setSuccess(true)
        } catch (error) {
            console.log(error)
            setMessage({
                type: 'error',
                show: true,
                title: "Uh oh! Something went wrong.",
                description: "Problem with Account verification. Please try again later.",
            })
        } finally {
            setProcessing(false)
        }

    }

    const refreshScore = async(address: string) => {
        setProcessing(true)
        try {
            const res = await fetch('/api/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }),
            });

            const data = await res.json();
            await loadConnectedHandle()
            setMessage({
                type: 'success',
                show: true,
                title: "Success!",
                description: "DTS has been refreshed successfully.",
            })
            setSuccess(true)
        } catch (error) {
            console.log(error)
            setMessage({
                type: 'error',
                show: true,
                title: "Uh oh! Something went wrong.",
                description: "Problem with refreshing DTS. Please try again later.",
            })
        } finally {
            setProcessing(false)
        }
    }

    return (
        <Card>
            {handle != "" ? <>
                <p className="mb-2 flex gap-2 items-center justify-start">Do you want to verify <Link href={`https://twitter.com/${handle}`} target="_blank" className="flex items-center bg-black/25 px-1 transition-all hover:bg-black/50">@{handle}</Link> for </p>
                <p className="mb-4">{address} ?</p>
                <div className="h-8"></div>
                {!success ?
                    <div className="flex gap-4 items-center">
                        {
                            processing ?
                                <Button disabled isLoading={true}>
                                    Verifying @{handle}
                                </Button> :
                                <Button onClick={() => verifyHandle(handle)}>Verify @{handle}</Button>
                        }
                        <Button variant="secondary" onClick={() => setCurrentStep("2")}>Back</Button>
                    </div> :
                    <>
                        <p className="text-green-800 bg-green-200 rounded-lg px-4 py-2 mb-5">Your Address has been verified against X Account!</p>
                        <ButtonLink href="/">Check DTS</ButtonLink>
                    </>
                }
            </> : <>
                <p className="mb-5">Do you want to refresh your DTS without connecting X account?</p>
                {!success ?
                    <div className="flex gap-4 items-center">
                        {
                            processing ?
                                <Button disabled isLoading={true}>
                                    Refreshing DTS
                                </Button> :
                                <Button onClick={() => refreshScore(address)}>Refresh DTS</Button>
                        }
                        <Button variant="secondary" onClick={() => setCurrentStep("2")}>Back</Button>
                    </div> :
                    <>
                        <p className="text-green-800 bg-green-200 rounded-lg px-4 py-2 mb-5">DTS has been refreshed for your address.</p>
                        <ButtonLink href="/">Check DTS</ButtonLink>
                    </>
                }
            </>
            }
            <Message message={message} setMessage={setMessage} />
        </Card>
    )
}

export default ConnectVerify