"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Link, Network, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DependencyFlow() {
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
      result: "Global P2P Infrastructure"
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
          <div className="space-y-8">
            {dependencies.map((tech, index) => {
              const Icon = tech.icon;
              const isLast = index === dependencies.length - 1;
              
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className={`h-16 w-16 rounded-full ${tech.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-8 w-8 ${tech.color}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-2xl font-bold ${tech.color}`}>{tech.name}</h3>
                        <Badge variant="outline">{tech.description}</Badge>
                      </div>
                      
                      {tech.problems && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-destructive mb-2">Current Problems:</h4>
                          <ul className="space-y-1">
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
                        <div className="mb-4">
                          <h4 className="font-semibold text-green-500 mb-2">Blockchain Solutions:</h4>
                          <ul className="space-y-1">
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
                        <div className="mb-4">
                          <h4 className="font-semibold text-blue-500 mb-2">IPv6 Capabilities:</h4>
                          <ul className="space-y-1">
                            {tech.enables.map((capability, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-blue-500 flex-shrink-0" />
                                {capability}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {(tech.needs || tech.result) && (
                        <div className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                          tech.needs ? 'bg-orange-500/20 text-orange-500' : 'bg-green-500/20 text-green-500'
                        }`}>
                          {tech.needs ? `Requires: ${tech.needs}` : `Enables: ${tech.result}`}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  {!isLast && (
                    <div className="flex justify-center my-6">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-primary"
                      >
                        <ArrowRight className="h-8 w-8" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
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
              globally without the current threats to AI's long-term viability.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Technology Map</CardTitle>
          <CardDescription>
            Explore how each technology builds upon the others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-purple-500/20 rounded-lg p-4 cursor-pointer"
              >
                <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <Badge variant="outline" className="text-purple-500">AI Layer</Badge>
              </motion.div>
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-500/20 rounded-lg p-4 cursor-pointer"
              >
                <Link className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <Badge variant="outline" className="text-blue-500">Blockchain Layer</Badge>
              </motion.div>
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-500/20 rounded-lg p-4 cursor-pointer"
              >
                <Network className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <Badge variant="outline" className="text-green-500">Network Layer</Badge>
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground">
              Each layer depends on and enables the next, creating a foundation for sustainable AI development
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}