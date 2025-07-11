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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? ArrowUp : ArrowDown;
        
        return (
          <Card 
            key={kpi.title} 
            className={`
              relative overflow-hidden group cursor-pointer
              hover:shadow-xl hover:scale-105 
              transition-all duration-500 ease-out
              animate-slide-up border-2 hover:border-primary/20
              ${kpi.trend === "up" ? "hover:shadow-green-400/20" : "hover:shadow-red-400/20"}
            `}
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgColor} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Trend Indicator Bar */}
            <div 
              className={`absolute top-0 left-0 h-1 w-full transition-all duration-500 ${
                kpi.trend === "up" ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gradient-to-r from-red-400 to-red-600"
              }`}
            />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {kpi.title}
              </CardTitle>
              <div className={`p-3 rounded-xl ${kpi.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="space-y-3">
                <div className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {kpi.value}
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`
                      flex items-center gap-1 px-3 py-1 border-0 font-medium
                      ${kpi.trend === "up" 
                        ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30" 
                        : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                      }
                    `}
                  >
                    <TrendIcon className="h-3 w-3" />
                    {kpi.change}
                  </Badge>
                  
                  <div className={`text-xs font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    vs. last month
                  </div>
                </div>
                
                {/* Mini Progress Bar */}
                <div className="w-full bg-muted/50 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${
                      kpi.trend === "up" ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gradient-to-r from-red-400 to-red-600"
                    }`}
                    style={{ 
                      width: `${Math.abs(parseFloat(kpi.change.replace('%', ''))) * 2}%`,
                      animationDelay: `${index * 200 + 500}ms`
                    }}
                  />
                </div>
              </div>
            </CardContent>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
          </Card>
        );
      })}
    </div>
  );
}