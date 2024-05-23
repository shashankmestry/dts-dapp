import Connect from "@/components/Connect"
import SectionHeader from "@/components/layout/SectionHeader"

const ConnectPage = () => {
    return (
        <div>
            <SectionHeader title="Verify Account" subTitle="Connect X to verify account" description="Verify Wallet Address with X by connecting account" />
            <Connect />
        </div>
    )
}

export default ConnectPage