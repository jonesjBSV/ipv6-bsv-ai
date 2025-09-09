import DependencyFlow from "@/components/dependency-flow";

export default function ConclusionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Conclusion: The Three Musketeers of Tech</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          AI → Blockchain → IPv6 form a critical dependency chain. 
          AI depends on blockchain for provenance, payments, and sustainability. 
          Blockchain depends on IPv6 for universal peer-to-peer communication. 
          Together, they create a foundation where creators are rewarded, truth is verifiable, 
          and innovation scales globally without collapse.
        </p>
      </div>
      
      <DependencyFlow />
    </div>
  );
}