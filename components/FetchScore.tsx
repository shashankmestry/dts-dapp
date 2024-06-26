"use client";

import { FormEvent, useState } from "react"
import Button from "./ui/Button"
import { ITrustScore } from "@/services/score.service"
import { isAddress } from "ethers"
import Message from "./ui/Message"
import ScoreCard from "./ScoreCard"
import ScoreData from "./ScoreData";
import { fetchScore } from "@/services/helper";

const FetchScore = () => {
    const [address, setAddress] = useState("")
    const [score, setScore] = useState<ITrustScore | null>(null)
    const [checking, setChecking] = useState(false)
    const [message, setMessage] = useState({
        type: "",
        show: false,
        title: "",
        description: ""
    })

    const getScore = async (e: FormEvent) => {
        e.preventDefault()
        if (!isAddress(address)) {
            setMessage({
                type: 'error',
                show: true,
                title: "Invalid Wallet Address",
                description: "Please enter valid ethereum wallet address"
            })
            return false
        }
        setChecking(true)
        const data = await fetchScore(address);
        if (data) {
            setScore(data)
        } else {
            setScore(null)
            setMessage({
                type: 'error',
                show: true,
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with cheking DTS."
            })
        }
        setChecking(false)
    }

    return (
        <>
            <form className="max-w-xl w-full mx-auto" onSubmit={getScore}>
                <div className="w-full flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-none">
                    <input type="text" className="form-input py-1.5 w-full mb-3 sm:mb-0 sm:mr-2 rounded-full bg-slate-800/30 border-slate-700" placeholder="Wallet Address" aria-label="Wallet Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <Button type="submit" isLoading={checking} disabled={checking}>Get Score</Button>
                </div>
                <Message message={message} setMessage={setMessage} />
            </form>
            {score && <div className="max-w-sm mx-auto my-10">
                <ScoreCard score={score} />
                <ScoreData score={score} />
            </div>
            }
        </>
    )
}

export default FetchScore