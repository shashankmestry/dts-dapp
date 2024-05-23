import CheckScore from '@/components/CheckScore'
import SectionHeader from '@/components/layout/SectionHeader'

export default function Home() {
  return (
    <div>
      <SectionHeader title='Decentralized Trust Score' subTitle='Check DTS' description='You can check your Decentralized Trust Score by connecting wallet' />
        <CheckScore />
    </div>
  )
}
