import AccountsModel from "@/models/AccountsModel"
import { ConnectDB } from "@/services/db";
import { isAddress, refreshTrustScore } from "@/services/score.service"
import { NextRequest, NextResponse } from "next/server"

const LoadDB = async()=>{
    await ConnectDB();
}

LoadDB()

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if(!address) {
        return NextResponse.json({ message: "invalid parameters" }, { status: 400 })
    }

    if(!isAddress(address)) {
        return NextResponse.json({ message: "invalid address" }, { status: 400 })
    }

    // const data = await getTrustScore(address);
    const account = await AccountsModel.findOne({ address });
    if(account) {
        return NextResponse.json(account)
    } else {
        return NextResponse.json({ message: "score not found" }, { status: 404 })
    }
}

export async function POST(request: NextRequest) {
    const {address} = await request.json()

    if(!address || !isAddress(address)) {
        return NextResponse.json({ message: "invalid address" }, { status: 400 })
    }

    const data = await refreshTrustScore(address);

    if(data) {
        return NextResponse.json(data)
    } else {
        return NextResponse.json({ message: "Error with refreshing scrore" }, { status: 500 })
    }
}