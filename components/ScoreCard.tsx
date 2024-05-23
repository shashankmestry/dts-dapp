import { ITrustScore } from "@/services/score.service"
import Card from "./ui/Card"
import ScoreBar from "./ScoreBar"

const ScoreCard = ({ score }: { score: ITrustScore }) => {
    return (
        <Card>
            <div className="text-4xl font-bold">
                {score.total}
            </div>
            <div className="text-xs">{score.address}</div>
            <div className="mt-5">
                <ScoreBar score={score} />
            </div>
        </Card>
    )
}

export default ScoreCard