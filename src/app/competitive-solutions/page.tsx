import { CompetitiveAnalysis } from '@/components/competitive-analysis';

export const metadata = {
  title: 'Why Current Solutions Fail - IPv6 BSV AI',
  description: 'Comprehensive analysis of existing approaches to AI sustainability problems and why BSV provides superior integrated solutions.',
};

export default function CompetitiveSolutionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CompetitiveAnalysis />
    </div>
  );
}