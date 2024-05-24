import { ITrustScore } from "@/services/score.service"
import Card from "./ui/Card"
import ScoreBar from "./ScoreBar"

const ScoreCard = ({ score }: { score: ITrustScore }) => {
    return (
        <Card>
            <p className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3 text-center">Your DTS Score</p>
            <div className="text-6xl font-bold pb-3 text-center">
                {score.total}
            </div>
            <div className="text-center mb-3">
                <span className="text-xs bg-red-600 px-2 py-1 rounded-lg uppercase">Low Trust</span>
            </div>
            <div className="text-xs">{score.address}</div>
            <div className="mt-5">
                <ScoreBar score={score} />
            </div>
        </Card>
    )
}

export default ScoreCard