import IPv6AdoptionVisualization from "@/components/ipv6-adoption-viz";

export default function IPv6LayerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">The Final Layer: IPv6 for True Peer-to-Peer</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Blockchain can&apos;t be fully peer-to-peer without the networking layer. 
          IPv6 enables direct device-to-device communication without NAT bottlenecks, 
          end-to-end addressing for every person, device, and AI agent, and support for 
          both local protocols (Bluetooth, NFC, QR) and global reach.
        </p>
      </div>
      
      <IPv6AdoptionVisualization />
    </div>
  );
}