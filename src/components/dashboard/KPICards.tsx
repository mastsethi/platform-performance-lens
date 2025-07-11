import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Eye, Heart, Target, MousePointer, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data with trend calculations and sparklines
const mockKPIData = [
  {
    title: "Total Reach",
    value: 1250000,
    previousValue: 1120000,
    icon: Users,
    color: "hsl(var(--chart-1))",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    sparkline: [850000, 920000, 980000, 1100000, 1180000, 1250000]
  },
  {
    title: "Total Views", 
    value: 854000,
    previousValue: 920000,
    icon: Eye,
    color: "hsl(var(--chart-2))",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    sparkline: [920000, 890000, 870000, 840000, 850000, 854000]
  },
  {
    title: "Engagement",
    value: 43500,
    previousValue: 40200,
    icon: Heart,
    color: "hsl(var(--chart-3))",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    sparkline: [35000, 37000, 39000, 40200, 42000, 43500]
  },
  {
    title: "Clicks",
    value: 12400,
    previousValue: 11800,
    icon: MousePointer,
    color: "hsl(var(--chart-4))",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    sparkline: [10500, 11000, 11200, 11800, 12100, 12400]
  },
  {
    title: "Leads",
    value: 2850,
    previousValue: 2480,
    icon: Target,
    color: "hsl(var(--chart-5))",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    sparkline: [2200, 2300, 2400, 2480, 2650, 2850]
  },
  {
    title: "Conversions",
    value: 890,
    previousValue: 910,
    icon: Zap,
    color: "hsl(var(--chart-6))",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    sparkline: [850, 870, 900, 910, 895, 890]
  }
];

// Simple sparkline component
const MiniSparkline = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = range === 0 ? 10 : 20 - ((value - min) / range) * 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="20" className="opacity-60">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
        className="drop-shadow-sm"
      />
    </svg>
  );
};

interface KPICardsProps {
  selectedPlatforms: string[];
  dateRange: { from: Date; to: Date };
}

export function KPICards({ selectedPlatforms, dateRange }: KPICardsProps) {
  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Summary Stats Banner */}
      <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/20 rounded-xl p-6 shadow-brand backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground">Active Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">98%</div>
            <div className="text-sm text-muted-foreground">Data Sync Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-chart-3">+12%</div>
            <div className="text-sm text-muted-foreground">Overall Growth</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-chart-4">$45.2K</div>
            <div className="text-sm text-muted-foreground">Revenue Impact</div>
          </div>
        </div>
      </div>

      {/* Enhanced KPI Cards Grid with Better Visual Hierarchy */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockKPIData.map((kpi, index) => {
          const change = calculateChange(kpi.value, kpi.previousValue);
          const isPositive = change >= 0;
          const Icon = kpi.icon;
          
          return (
            <Card 
              key={kpi.title} 
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group border-l-4",
                kpi.bgColor,
                "hover:bg-opacity-80"
              )}
              style={{ borderLeftColor: kpi.color }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {kpi.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Icon 
                    className="h-5 w-5 transition-transform group-hover:scale-110" 
                    style={{ color: kpi.color }}
                  />
                  <MiniSparkline data={kpi.sparkline} color={kpi.color} />
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {formatNumber(kpi.value)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      vs {formatNumber(kpi.previousValue)} last period
                    </div>
                  </div>
                  
                  <Badge 
                    variant={isPositive ? "default" : "destructive"}
                    className={cn(
                      "flex items-center gap-1 px-2 py-1 text-xs font-semibold",
                      isPositive 
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                    )}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(change).toFixed(1)}%
                  </Badge>
                </div>
                
                {/* Enhanced progress bar with animation */}
                <div className="mt-4 w-full bg-muted/30 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000 ease-out rounded-full shadow-sm"
                    style={{ 
                      width: `${Math.min((kpi.value / Math.max(kpi.value, kpi.previousValue)) * 100, 100)}%`,
                      backgroundColor: kpi.color 
                    }}
                  />
                </div>
              </CardContent>
              
              {/* Animated accent line with pulse effect */}
              <div 
                className="absolute bottom-0 left-0 h-1 transition-all duration-500 group-hover:h-2 group-hover:shadow-glow"
                style={{ 
                  width: `${Math.min(Math.abs(change) * 3, 100)}%`,
                  backgroundColor: kpi.color,
                  opacity: 0.8
                }}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}