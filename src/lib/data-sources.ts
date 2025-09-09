// Data fetching utilities for presentation statistics
export interface AIMetrics {
  chatgptUsers: number;
  aiInvestment: number;
  aiModelsReleased: number;
  processingPowerGrowth: number;
}

export interface IPv6Stats {
  globalAdoption: number;
  countryAdoption: { [country: string]: number };
  googleTraffic: number;
  growth: number;
}

export interface DeepfakeMetrics {
  detectionAccuracy: number;
  humanAccuracy: number;
  trustIndex: number;
  incidentReports: number;
}

export interface DataExploitationStats {
  webScrapingVolume: number;
  compensationPaid: number;
  creatorsAffected: number;
  datasetSizes: { company: string; size: string; cost: number }[];
}

// Mock data for reliable presentation delivery
const mockAIMetrics: AIMetrics = {
  chatgptUsers: 180000000, // 180M+ users
  aiInvestment: 200000000000, // $200B+ in 2024
  aiModelsReleased: 150, // Major models released in 2024
  processingPowerGrowth: 300 // 300% YoY growth
};

const mockIPv6Stats: IPv6Stats = {
  globalAdoption: 42.5, // ~42.5% global adoption
  countryAdoption: {
    "United States": 48.2,
    "Germany": 65.8,
    "Belgium": 71.4,
    "India": 68.9,
    "France": 52.3,
    "United Kingdom": 32.1,
    "Brazil": 44.6,
    "Japan": 41.8,
    "China": 3.2,
    "Russia": 8.4
  },
  googleTraffic: 40.1, // % of Google traffic over IPv6
  growth: 8.5 // YoY growth percentage
};

const mockDeepfakeMetrics: DeepfakeMetrics = {
  detectionAccuracy: 73.2, // AI detection accuracy declining
  humanAccuracy: 61.8, // Human ability to detect fakes
  trustIndex: 34.7, // Trust in digital content (declining)
  incidentReports: 9847 // Reported deepfake incidents
};

const mockDataExploitationStats: DataExploitationStats = {
  webScrapingVolume: 45000000000000, // 45TB+ of scraped data
  compensationPaid: 0, // $0 paid to creators
  creatorsAffected: 2800000000, // ~2.8B creators affected
  datasetSizes: [
    { company: "OpenAI", size: "570GB", cost: 0 },
    { company: "Meta", size: "1.4TB", cost: 0 },
    { company: "Google", size: "2.3TB", cost: 0 },
    { company: "Microsoft", size: "825GB", cost: 0 },
    { company: "Anthropic", size: "650GB", cost: 0 }
  ]
};

// Real data fetching functions (with fallbacks)
export async function getAIMetrics(): Promise<AIMetrics> {
  try {
    // In a real implementation, you would fetch from APIs like:
    // - AI industry reports
    // - OpenAI usage statistics
    // - Venture capital databases
    // - Research paper databases
    
    // For presentation reliability, return mock data
    return mockAIMetrics;
  } catch (error) {
    console.warn('Failed to fetch AI metrics, using fallback data:', error);
    return mockAIMetrics;
  }
}

export async function getIPv6Statistics(): Promise<IPv6Stats> {
  try {
    // Real data sources:
    // - Google IPv6 statistics
    // - APNIC IPv6 measurement data
    // - Akamai State of the Internet reports
    
    // For presentation reliability, return mock data
    return mockIPv6Stats;
  } catch (error) {
    console.warn('Failed to fetch IPv6 stats, using fallback data:', error);
    return mockIPv6Stats;
  }
}

export async function getDeepfakeMetrics(): Promise<DeepfakeMetrics> {
  try {
    // Real data sources:
    // - Academic research papers
    // - Deepfake detection tool accuracy reports
    // - Trust surveys and studies
    // - Security incident databases
    
    // For presentation reliability, return mock data
    return mockDeepfakeMetrics;
  } catch (error) {
    console.warn('Failed to fetch deepfake metrics, using fallback data:', error);
    return mockDeepfakeMetrics;
  }
}

export async function getDataExploitationStats(): Promise<DataExploitationStats> {
  try {
    // Real data sources:
    // - Company earnings reports
    // - Dataset documentation
    // - Research on training data usage
    // - Creator economy studies
    
    // For presentation reliability, return mock data
    return mockDataExploitationStats;
  } catch (error) {
    console.warn('Failed to fetch data exploitation stats, using fallback data:', error);
    return mockDataExploitationStats;
  }
}

// Chart data formatters for visualizations
export function formatAIGrowthData(_metrics: AIMetrics) {
  return [
    { year: 2020, users: 0, investment: 50, models: 10 },
    { year: 2021, users: 0, investment: 75, models: 25 },
    { year: 2022, users: 0, investment: 120, models: 45 },
    { year: 2023, users: 100, investment: 150, models: 85 },
    { year: 2024, users: 180, investment: 200, models: 150 }
  ];
}

export function formatIPv6AdoptionData(stats: IPv6Stats) {
  return Object.entries(stats.countryAdoption).map(([country, adoption]) => ({
    country,
    adoption,
    color: adoption > 50 ? '#10b981' : adoption > 30 ? '#f59e0b' : '#ef4444'
  }));
}

export function formatTrustDeclineData(_metrics: DeepfakeMetrics) {
  return [
    { year: 2018, trust: 78, detection: 95, human: 85 },
    { year: 2019, trust: 74, detection: 92, human: 82 },
    { year: 2020, trust: 68, detection: 88, human: 78 },
    { year: 2021, trust: 61, detection: 84, human: 74 },
    { year: 2022, trust: 52, detection: 79, human: 68 },
    { year: 2023, trust: 43, detection: 76, human: 64 },
    { year: 2024, trust: 35, detection: 73, human: 62 }
  ];
}