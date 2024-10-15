import { HeroScreen } from '@/components/home/hero-screen'
import { AirdropScreen } from '@/components/home/airdrop-screen'
import { ComparisonScreen } from '@/components/home/comparison-screen'

export default function HomePage() {
  return (
    <div className="p-8 space-y-14 max-sm:pt-0 max-sm:p-4">
      <HeroScreen />
      <AirdropScreen />
      <ComparisonScreen />
    </div>
  )
}
