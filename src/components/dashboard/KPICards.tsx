import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Users, 
  Heart, 
  MousePointer, 
  Target, 
  TrendingUp,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const kpis = [
  {
    title: "Total Reach",
    value: "2.4M",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10"
  },
  {
    title: "Total Views",
    value: "847K",
    change: "+8.2%",
    trend: "up",
    icon: Eye,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10"
  },
  {
    title: "Engagement",
    value: "156K",
    change: "+15.7%",
    trend: "up",
    icon: Heart,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10"
  },
  {
    title: "Clicks",
    value: "89.2K",
    change: "-2.1%",
    trend: "down",
    icon: MousePointer,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10"
  },
  {
    title: "Leads",
    value: "12.4K",
    change: "+22.3%",
    trend: "up",
    icon: Target,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10"
  },
  {
    title: "Conversions",
    value: "3.8K",
    change: "+18.9%",
    trend: "up",
    icon: TrendingUp,
    color: "text-chart-6",
    bgColor: "bg-chart-6/10"
  }
];

interface KPICardsProps {
  selectedPlatforms: string[];
  dateRange: { from: Date; to: Date };
}

export function KPICards({ selectedPlatforms, dateRange }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? ArrowUp : ArrowDown;
        
        return (
          <Card key={kpi.title} className="relative overflow-hidden group hover:shadow-glow/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{kpi.value}</div>
                <Badge 
                  variant="secondary" 
                  className={`flex items-center gap-1 ${
                    kpi.trend === "up" 
                      ? "text-green-400 bg-green-400/10" 
                      : "text-red-400 bg-red-400/10"
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {kpi.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                vs. previous period
              </p>
            </CardContent>
            
            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
          </Card>
        );
      })}
    </div>
  );
}