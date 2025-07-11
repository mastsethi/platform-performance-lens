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
    value: "215,632",
    rawValue: 215632,
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    previous: 192530
  },
  {
    title: "Total Views", 
    value: "174,000",
    rawValue: 174000,
    change: "-5%",
    trend: "down",
    icon: Eye,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    previous: 183160
  },
  {
    title: "Engagements",
    value: "11,540",
    rawValue: 11540,
    change: "+8%",
    trend: "up",
    icon: Heart,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    previous: 10685
  },
  {
    title: "Clicks",
    value: "4,312",
    rawValue: 4312,
    change: "+3%",
    trend: "up",
    icon: MousePointer,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    previous: 4186
  },
  {
    title: "Leads",
    value: "390",
    rawValue: 390,
    change: "+15%",
    trend: "up",
    icon: Target,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    previous: 339
  },
  {
    title: "Conversions",
    value: "120",
    rawValue: 120,
    change: "-2%",
    trend: "down",
    icon: TrendingUp,
    color: "text-chart-6",
    bgColor: "bg-chart-6/10",
    previous: 122
  }
];

interface KPICardsProps {
  selectedPlatforms: string[];
  dateRange: { from: Date; to: Date };
}

export function KPICards({ selectedPlatforms, dateRange }: KPICardsProps) {
  return (
    <div className="space-y-8">
      {/* Summary Stats Banner */}
      <div className="bg-gradient-brand/5 border border-primary/20 rounded-xl p-6 shadow-brand">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground">Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">397K</div>
            <div className="text-sm text-muted-foreground">Total Reach</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+8.2%</div>
            <div className="text-sm text-muted-foreground">Growth</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">16.5K</div>
            <div className="text-sm text-muted-foreground">Engagements</div>
          </div>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === "up" ? ArrowUp : ArrowDown;
          const progressPercentage = (kpi.rawValue / Math.max(kpi.rawValue, kpi.previous)) * 100;
          
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
                className={`absolute top-0 left-0 h-2 transition-all duration-500 ${
                  kpi.trend === "up" ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gradient-to-r from-red-400 to-red-600"
                }`}
                style={{ width: `${Math.abs(parseFloat(kpi.change.replace('%', '')))}%` }}
              />
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {kpi.title}
                </CardTitle>
                <div className={`p-3 rounded-xl ${kpi.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {kpi.value}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={`
                          flex items-center gap-1 px-3 py-1 border-0 font-medium text-xs
                          ${kpi.trend === "up" 
                            ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30" 
                            : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                          }
                        `}
                      >
                        <TrendIcon className="h-3 w-3" />
                        {kpi.change}
                      </Badge>
                      
                      <div className="text-xs text-muted-foreground">
                        vs. last period
                      </div>
                    </div>
                    
                    {/* Comparison bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Previous: {kpi.previous.toLocaleString()}</span>
                        <span>{progressPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted/50 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out rounded-full ${
                            kpi.trend === "up" ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gradient-to-r from-red-400 to-red-600"
                          }`}
                          style={{ 
                            width: `${progressPercentage}%`,
                            animationDelay: `${index * 200 + 500}ms`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}