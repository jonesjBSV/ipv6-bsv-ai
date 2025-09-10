"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Link, Network, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function DependencyFlow() {
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);
  
  const dependencies = [
    {
      name: "AI",
      icon: Brain,
      color: "text-purple-500",
      bg: "bg-purple-500/20",
      description: "Artificial Intelligence",
      problems: [
        "Data exploitation without compensation",
        "Deepfake-induced trust collapse",
        "Unsustainable creator economics"
      ],
      needs: "Micropayments & Content Verification"
    },
    {
      name: "Blockchain",
      icon: Link,
      color: "text-blue-500", 
      bg: "bg-blue-500/20",
      description: "BSV Blockchain",
      solutions: [
        "Automatic micropayment distribution",
        "Cryptographic content timestamping",
        "Transparent attribution records"
      ],
      needs: "True Peer-to-Peer Communication"
    },
    {
      name: "IPv6",
      icon: Network,
      color: "text-green-500",
      bg: "bg-green-500/20", 
      description: "Internet Protocol v6",
      enables: [
        "Direct device-to-device communication",
        "No NAT bottlenecks or middlemen",
        "End-to-end addressing for all devices"
      ],
      needs: "Complete Integration"
    },
    {
      name: "Future",
      icon: Sparkles,
      color: "text-primary",
      bg: "bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-green-500/20",
      description: "Integrated Technology Stack",
      outcomes: [
        "Creators are rewarded automatically",
        "Truth is cryptographically verifiable", 
        "Innovation scales without collapse"
      ],
      result: "Sustainable AI Future"
    }
  ];

  const outcomes = [
    { title: "Creators are rewarded", description: "Automatic compensation for all content usage" },
    { title: "Truth is verifiable", description: "Cryptographic provenance for all content" },
    { title: "Innovation scales globally", description: "Without collapse or trust erosion" }
  ];

  return (
    <div className="space-y-8">
      {/* Main Dependency Chain */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            The Interdependent Technology Chain
          </CardTitle>
          <CardDescription>
            How AI, Blockchain, and IPv6 form a critical dependency relationship
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!highlightedTech ? (
            /* Compact View - Show all technologies with just icons and names */
            <div className="flex justify-center items-center space-x-6">
              {dependencies.map((tech, index) => {
                const Icon = tech.icon;
                const isLast = index === dependencies.length - 1;
                
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="text-center">
                      <div className={`h-16 w-16 rounded-full ${tech.bg} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className={`h-8 w-8 ${tech.color}`} />
                      </div>
                      <h3 className={`text-lg font-bold ${tech.color} mb-1`}>{tech.name}</h3>
                      <Badge variant="outline" className="text-xs">{tech.description}</Badge>
                    </div>
                    {!isLast && (
                      <ArrowRight className="h-6 w-6 text-muted-foreground mx-4" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Detail View - Show only the selected technology with full details */
            <div className="space-y-6">
              {dependencies.map((tech) => {
                if (tech.name !== highlightedTech) return null;
                
                const Icon = tech.icon;
                
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-primary/5 rounded-lg p-6 border border-primary/20"
                  >
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className={`h-16 w-16 rounded-full ${tech.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-8 w-8 ${tech.color}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className={`text-3xl font-bold ${tech.color}`}>{tech.name}</h3>
                          <Badge variant="outline">{tech.description}</Badge>
                        </div>
                        
                        {tech.problems && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-destructive mb-3">Current Problems:</h4>
                            <ul className="space-y-2">
                              {tech.problems.map((problem, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 bg-destructive rounded-full flex-shrink-0"></div>
                                  {problem}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {tech.solutions && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-green-500 mb-3">Blockchain Solutions:</h4>
                            <ul className="space-y-2">
                              {tech.solutions.map((solution, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                  {solution}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {tech.enables && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-blue-500 mb-3">IPv6 Capabilities:</h4>
                            <ul className="space-y-2">
                              {tech.enables.map((capability, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-blue-500 flex-shrink-0" />
                                  {capability}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {tech.outcomes && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-primary mb-3">Integrated Outcomes:</h4>
                            <ul className="space-y-2">
                              {tech.outcomes.map((outcome, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <Sparkles className="h-3 w-3 text-primary flex-shrink-0" />
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {(tech.needs || tech.result) && (
                          <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                            tech.needs ? 'bg-orange-500/20 text-orange-500' : 'bg-green-500/20 text-green-500'
                          }`}>
                            {tech.needs ? `Requires: ${tech.needs}` : `Enables: ${tech.result}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          
          {/* Interactive Technology Map */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Interactive Technology Map</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click any technology layer to highlight it in the dependency chain above
                </p>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHighlightedTech(highlightedTech === 'AI' ? null : 'AI')}
                  className={`bg-purple-500/20 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    highlightedTech === 'AI' ? 'ring-2 ring-purple-500 bg-purple-500/30' : ''
                  }`}
                >
                  <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <Badge variant="outline" className="text-purple-500">AI Layer</Badge>
                </motion.div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHighlightedTech(highlightedTech === 'Blockchain' ? null : 'Blockchain')}
                  className={`bg-blue-500/20 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    highlightedTech === 'Blockchain' ? 'ring-2 ring-blue-500 bg-blue-500/30' : ''
                  }`}
                >
                  <Link className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <Badge variant="outline" className="text-blue-500">Blockchain Layer</Badge>
                </motion.div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHighlightedTech(highlightedTech === 'IPv6' ? null : 'IPv6')}
                  className={`bg-green-500/20 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    highlightedTech === 'IPv6' ? 'ring-2 ring-green-500 bg-green-500/30' : ''
                  }`}
                >
                  <Network className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <Badge variant="outline" className="text-green-500">Network Layer</Badge>
                </motion.div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHighlightedTech(highlightedTech === 'Future' ? null : 'Future')}
                  className={`bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-green-500/20 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    highlightedTech === 'Future' ? 'ring-2 ring-primary bg-primary/20' : ''
                  }`}
                >
                  <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                  <Badge variant="outline" className="text-primary">Integrated Future</Badge>
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground">
                {highlightedTech 
                  ? `${highlightedTech} is highlighted in the dependency chain above. Click again to deselect.`
                  : 'Each layer depends on and enables the next, creating a foundation for sustainable AI development'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Outcomes */}
      <Card className="bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-500">The Future Foundation</CardTitle>
          <CardDescription>
            What becomes possible when all three technologies work together
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="bg-background/50 rounded-lg p-4 text-center"
              >
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h4 className="font-semibold text-green-500 mb-2">{outcome.title}</h4>
                <p className="text-sm text-muted-foreground">{outcome.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Without Collapse</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This integrated system creates sustainable incentives for creators, 
              maintains trust through verification, and enables innovation to scale 
              globally without the current threats to AI&apos;s long-term viability.
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}