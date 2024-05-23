import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"
import Button from "./ui/Button"
import Card from "./ui/Card"
import Message from "./ui/Message"

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

    return (
        <Card>
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
                <p className="text-green-800 bg-green-200 rounded-lg px-4 py-2">Your Address has been verified against X Account!</p>
            }
            <Message message={message} setMessage={setMessage} />
        </Card>
    )
}

export default ConnectVerify