import { ITrustScore } from "@/services/score.service"
import { TiLocation } from "react-icons/ti";

const ScoreBar = ({ score }: { score: ITrustScore }) => {
    return (
        <div className="relative overflow-hidden">
            <div className="flex items-center">
                <div style={{'width': `${score.total > 0 ? score.total : 10 }%`}} className="flex justify-end text-xl">
                    <TiLocation className="" />
                </div>
                <div className={`w-[${100 - score.total}%] h2 bg-gray-400 text-center`}></div>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-[30%] h-2 rounded-lg bg-red-600"></div>
                <div className="w-[50%] h-2 rounded-lg bg-yellow-500"></div>
                <div className="w-[20%] h-2 rounded-lg bg-green-600"></div>
            </div>
            
        </div>
    )
}

export default ScoreBar