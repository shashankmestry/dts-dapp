import { ITrustScore } from "@/services/score.service"
import { useEffect, useState } from "react"
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

interface IScoreDetials {
    pass: string[],
    fail: string[]
}

const ScoreData = ({ score }: { score: ITrustScore }) => {
    const [details, setDetails] = useState<IScoreDetials | null>(null)

    useEffect(() => {
        const data: IScoreDetials = {
            pass: [],
            fail: []
        }
        if(score) {
            if(score.transactionCount >= 20) {
                data.pass.push("Number of transactions are more than 20")
            } else {
                data.fail.push("Number of transactions are less than 20")
            }

            if(score.transactionsValue >= 5) {
                data.pass.push("Total transaction amount is more than 5 ETH")
            } else {
                data.fail.push("Total transaction amount is not more than 5 ETH")
            }

            if(score.ens != "") {
                data.pass.push("ENS is assgined to the address")
            } else {
                data.fail.push("ENS is not assgined to the address")
            }

            if(score.nftCount > 0) {
                data.pass.push("The address owns NFT")
            } else {
                data.fail.push("The address does not own any NFT")
            }

            if(score.twitterHandle != "") {
                data.pass.push("X account is verified for the address")
            } else {
                data.fail.push("X account is not verified for the address")
            }

            setDetails(data)
        }
    }, [score])

    return (
        <>
            { details && <div className="flex flex-col gap-4 text-start my-10">
                { details.pass.map((value, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <FaCircleCheck className="text-green-700" />
                        <span>{value}</span>
                    </div>
                )) }
                { details.fail.map((value, index) => (
                    <div key={index} className="flex items-center space-x-4 text-slate-600">
                        <FaCircleXmark />
                        <span>{value}</span>
                    </div>
                )) }
            </div> }
        </>
    )
}

export default ScoreData