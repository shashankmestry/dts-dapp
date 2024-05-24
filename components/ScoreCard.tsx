import { ITrustScore } from "@/services/score.service"
import Card from "./ui/Card"
import ScoreBar from "./ScoreBar"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const ScoreCard = ({ score }: { score: ITrustScore }) => {
    const [trust, setTrust] = useState("low")
    const trusts: { [key: string]: string } = {
        'low': 'bg-red-600',
        'medium': 'bg-yellow-600',
        'high': 'bg-green-600'
    }

    useEffect(() => {
        if(score.total > 80) {
            setTrust('high')
        } else if(score.total > 30) {
            setTrust('medium')
        } else {
            setTrust('low')
        }
    }, [score.total])

    return (
        <Card>
            <p className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3 text-center">Your DTS Score</p>
            <div className="text-6xl font-bold pb-3 text-center">
                {score.total}
            </div>
            <div className="text-center mb-3">
                <span className={cn("text-xs font-semibold tracking-wider text-white/75 px-2 py-1 rounded-lg uppercase", trusts[trust])}>{trust} Trust</span>
            </div>
            <div className="text-xs text-center">{score.address}</div>
            <div className="mt-5">
                <ScoreBar score={score} />
            </div>
        </Card>
    )
}

export default ScoreCard