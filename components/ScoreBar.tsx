import { ITrustScore } from "@/services/score.service"
import { TiLocation } from "react-icons/ti";

const ScoreBar = ({ score }: { score: ITrustScore }) => {
    return (
        <div className="relative overflow-hidden">
            <div className="flex items-center gap-1">
                <div style={{'width': `${score.total}%`}} className="flex justify-end text-xl">
                    <TiLocation className="" />
                </div>
                <div className={`w-[${100 - score.total}%] h2 bg-gray-400 text-center`}></div>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-[30%] h-2 rounded-lg bg-red-600"></div>
                <div className="w-[35%] h-2 rounded-lg bg-yellow-500"></div>
                <div className="w-[35%] h-2 rounded-lg bg-green-600"></div>
            </div>
            
        </div>
    )
}

export default ScoreBar