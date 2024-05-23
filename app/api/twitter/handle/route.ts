import AccountsModel from "@/models/AccountsModel";
import { getTrustScore } from "@/services/score.service";
import { isAddress } from "ethers";
import { NextRequest, NextResponse } from "next/server";
const { ConnectDB } = require("@/services/db");

const LoadDB = async()=>{
    await ConnectDB();
}

LoadDB()

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")
    if(!address || !isAddress(address)) {
        return NextResponse.json({ message: "invalid address" }, { status: 400 })
    }

    const account = await AccountsModel.findOne({ address });
    console.log(account)
    if(account) {
        return NextResponse.json({ address, handle: account.twitterHandle })
    } else {
        return NextResponse.json({ message: "account not found" }, { status: 404 })
    }
}

export async function POST(request: NextRequest) {
    const {address, handle} = await request.json()

    if(!address || !isAddress(address)) {
        return NextResponse.json({ message: "invalid address" }, { status: 400 })
    }
    if(!handle || handle == "") {
        return NextResponse.json({ message: "invalid handle" }, { status: 400 }) 
    }

    const scoreDetails = await getTrustScore(address);
    scoreDetails.twitterHandle = handle;
    scoreDetails.total += 20; 

    const account = await AccountsModel.updateOne(
        { address }, scoreDetails, { upsert: true }
    );

    if(account) {
        return NextResponse.json(account)
    } else {
        return NextResponse.json({ message: "Error with updating account" }, { status: 400 })
    }
}

