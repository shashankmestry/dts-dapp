"use client";

import Connect from "@/components/Connect"
import SectionHeader from "@/components/layout/SectionHeader"
import { useSearchParams } from 'next/navigation'

const ConnectPage = () => {
    const searchParams = useSearchParams()
    const target = searchParams.get('target')
    console.log(target)
    if(target && target == 'participate') {
        localStorage.setItem('connect_target', 'participate');
    }
    console.log(target)

    return (
        <div>
            <SectionHeader title="Verify Account" subTitle="Connect X to verify account" description="Verify Wallet Address with X by connecting account" />
            <Connect />
        </div>
    )
}

export default ConnectPage