import AIGrowthChart from "@/components/ai-growth-chart";

export default function IntroductionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Introduction: Why This Matters</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          AI&apos;s explosive growth has transformed industries and society at an unprecedented pace. 
          ChatGPT, image generators, deepfakes, and enterprise AI adoption show no signs of slowing down.
        </p>
      </div>
      
      <AIGrowthChart />
    </div>
  );
}