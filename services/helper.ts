"use client";

export const fetchScore = async (address: string) => {
    try {
        const res = await fetch(`/api/score/?address=${address}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        if(data.total != undefined) {
            return data
        } else {
            return await refreshScore(address);
        }
    } catch (error) {
        return false
    }
}

const refreshScore = async (address: string) => {
    try {
        const res = await fetch(`/api/score/?address=${address}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address }),
        });

        const data = await res.json();
        if(data.total != undefined) {
            return data;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
}