import TrustCrisisVisualization from "@/components/trust-crisis-viz";

export default function TrustCrisisPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Problem 2: Collapse of Trust Through Deepfakes</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Deepfakes and synthetic media are becoming indistinguishable from reality. 
          This creates a cascade of consequences: individuals can no longer tell real from fake, 
          bad actors can generate chaos, and societal trust erodes. Without trust, even legitimate AI outputs become suspect.
        </p>
      </div>
      
      <TrustCrisisVisualization />
    </div>
  );
}