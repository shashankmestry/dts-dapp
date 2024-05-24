import FetchScore from '@/components/FetchScore'
import SectionHeader from '@/components/layout/SectionHeader'

const CheckPage = () => {
  return (
    <div>
        <SectionHeader title="Decentralized Trust Score" subTitle="Check DTS" description="You can check DTS of any wallet address" />
        <FetchScore />
    </div>
  )
}

export default CheckPage