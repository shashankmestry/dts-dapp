import AccountsModel from "@/models/AccountsModel";
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";

// const getAlchemy = (network: string) => {
//     if (network == 'base-sepolia') {
//         return new Alchemy({
//             apiKey: process.env.BASE_SEPOLIA_KEY,
//             network: Network.BASE_SEPOLIA
//         })
//     } else if (network == 'arb-sepolia') {
//         return new Alchemy({
//             apiKey: process.env.ARB_SEPOLIA_KEY,
//             network: Network.ARB_SEPOLIA
//         })
//     } else if (network == 'main') {
//         return new Alchemy({
//             apiKey: process.env.ETH_MAIN_KEY,
//             network: Network.ETH_MAINNET
//         })
//     } else {
//         return null;
//     }
// }

const getAlchemy = (): Alchemy => {
    return new Alchemy({
        apiKey: process.env.ETH_MAIN_KEY,
        network: Network.ETH_MAINNET,
        url: "https://eth-mainnet.g.alchemy.com/v2/9-ALSD-Ex96wWd6trvPTubN1xj7YVKO5"
    })
}

export interface ITrustScore {
    address?: string,
    transactionCount: number,
    transactionsValue: number,
    ens: string,
    nftCount: number,
    twitterHandle: string,
    total: number
}

const settings = {
    apiKey: process.env.ETH_MAIN_KEY,
    network: Network.ETH_MAINNET,
    maxRetries: 10,
    timeout: 10000
};

const alchemy = new Alchemy(settings)

export const refreshTrustScore = async(address: string) => {
    const scoreDetails = {
        address: address,
        transactionCount: 0,
        transactionsValue: 0,
        ens: "",
        nftCount: 0,
        twitterHandle: "",
        total: 0
    }
    try {
        const results = await Promise.all([
            getTransactionCount(alchemy, address),
            getTransactionsValue(alchemy, address),
            getENS(alchemy, address),
            getNFTCount(alchemy, address),
            getTwitterHandle(address)
        ]);
        scoreDetails.transactionCount = results[0];
        scoreDetails.transactionsValue = results[1];
        scoreDetails.ens = results[2];
        scoreDetails.nftCount = results[3];
        scoreDetails.twitterHandle = results[4];
        if (scoreDetails.transactionCount >= 20) {
            scoreDetails.total += 20;
        }
        if(scoreDetails.transactionsValue >= 5) {
            scoreDetails.total +=20;
        }
        if(scoreDetails.ens !== "") {
            scoreDetails.total +=25;
        }
        if(scoreDetails.nftCount > 0) {
            scoreDetails.total +=15;
        }
        if(scoreDetails.twitterHandle !== "") {
            scoreDetails.total +=20;
        }

        const account = await AccountsModel.updateOne(
            { address }, scoreDetails, { upsert: true }
        );

        if(account) {
            return scoreDetails
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

export const getTrustScore = async (address: string) => {
    const scoreDetails = {
        transactionCount: 0,
        transactionsValue: 0,
        ens: "",
        nftCount: 0,
        twitterHandle: "",
        total: 0
    }

    try {
        const results = await Promise.all([
            getTransactionCount(alchemy, address),
            getTransactionsValue(alchemy, address),
            getENS(alchemy, address),
            getNFTCount(alchemy, address),
            getTwitterHandle(address)
        ]);
        scoreDetails.transactionCount = results[0];
        scoreDetails.transactionsValue = results[1];
        scoreDetails.ens = results[2];
        scoreDetails.nftCount = results[3];
        scoreDetails.twitterHandle = results[4];
        if (scoreDetails.transactionCount >= 20) {
            scoreDetails.total += 20;
        }
        if(scoreDetails.transactionsValue >= 5) {
            scoreDetails.total +=20;
        }
        if(scoreDetails.ens !== "") {
            scoreDetails.total +=25;
        }
        if(scoreDetails.nftCount > 0) {
            scoreDetails.total +=15;
        }
    } catch (error) {
        console.log(error)
    }

    return scoreDetails;
}

const getTransactionCount = async (alchemy: Alchemy, address: string) => {
    try {
        const count = await alchemy.core.getTransactionCount(address)
        console.log(count)
        return count;
    } catch (error) {
        console.log(error)
        return 0;
    }
}

const getTransactionsValue = async (alchemy: Alchemy, address: string) => {
    const target = 5;
    let total = 0;
    const response = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        excludeZeroValue: true,
        category: [AssetTransfersCategory.EXTERNAL],
    })

    response.transfers.forEach(item => {
        if (item.value) {
            total += item.value
        }
    });

    return total;
}

const getENS = async (alchemy: Alchemy, address: string) => {
    const ensContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
    const nfts = await alchemy.nft.getNftsForOwner(address, {
        contractAddresses: [ensContractAddress],
    });
    if (nfts.totalCount > 0) {
        return nfts.ownedNfts[0].name || ""
        // const names: string[] = []
        // nfts.ownedNfts.forEach(nft => {
        //     if (nft.name) {
        //         names.push(nft.name);
        //     }
        // })
        // return names.join(", ")
    } else {
        return "";
    }
}

const getNFTCount = async (alchemy: Alchemy, address: string) => {
    const nfts = await alchemy.nft.getNftsForOwner(address);
    return nfts.totalCount;
}

export const getTwitterHandle = async (address: string) => {
    try {
        const res = await fetch(`${process.env.HOST}/api/twitter/handle/?address=${address}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        console.log(data)
        return data.handle;
    } catch (error) {
        console.log(error)
        return "";
    }
}

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
export const isAddress = (address: string) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    }
    return true;
};
