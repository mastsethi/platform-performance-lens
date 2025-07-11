import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, TrendingUp, TrendingDown, Eye, Users, Heart, Target } from "lucide-react";
import { format, subDays, subWeeks, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

// Mock data for different periods
const generateMockData = (period: 'week' | 'month' | 'year') => {
  const baseData = [
    { twitter: 4000, instagram: 2400, youtube: 2400, linkedin: 1800, medium: 800, reddit: 600, website: 1200 },
    { twitter: 3000, instagram: 1398, youtube: 2210, linkedin: 2000, medium: 900, reddit: 700, website: 1400 },
    { twitter: 2000, instagram: 9800, youtube: 2290, linkedin: 2500, medium: 1100, reddit: 800, website: 1600 },
    { twitter: 2780, instagram: 3908, youtube: 2000, linkedin: 2200, medium: 1200, reddit: 900, website: 1800 },
    { twitter: 1890, instagram: 4800, youtube: 2181, linkedin: 2400, medium: 1000, reddit: 750, website: 1500 },
    { twitter: 2390, instagram: 3800, youtube: 2500, linkedin: 2600, medium: 1300, reddit: 850, website: 1700 },
  ];

  if (period === 'week') {
    return baseData.slice(0, 4).map((data, index) => ({
      period: `Week ${index + 1}`,
      ...data
    }));
  } else if (period === 'month') {
    return baseData.map((data, index) => ({
      period: format(subMonths(new Date(), 5 - index), 'MMM yyyy'),
      ...data
    }));
  } else {
    return Array.from({ length: 12 }, (_, index) => ({
      period: format(subMonths(new Date(), 11 - index), 'MMM yyyy'),
      twitter: Math.floor(Math.random() * 5000) + 2000,
      instagram: Math.floor(Math.random() * 4000) + 1500,
      youtube: Math.floor(Math.random() * 3000) + 1000,
      linkedin: Math.floor(Math.random() * 3500) + 1200,
      medium: Math.floor(Math.random() * 1500) + 500,
      reddit: Math.floor(Math.random() * 1000) + 400,
      website: Math.floor(Math.random() * 2000) + 800,
    }));
  }
};

const platformColors = {
  twitter: "hsl(var(--chart-1))",
  instagram: "hsl(var(--chart-2))", 
  youtube: "hsl(var(--chart-3))",
  linkedin: "hsl(var(--chart-4))",
  medium: "hsl(var(--chart-5))",
  reddit: "hsl(var(--chart-6))",
  website: "hsl(var(--brand-primary))"
};

interface ComparisonChartsProps {
  selectedPlatforms: string[];
}

export function ComparisonCharts({ selectedPlatforms }: ComparisonChartsProps) {
  const [selectedMetric, setSelectedMetric] = useState("views");
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: subDays(new Date(), 30),
    to: new Date()
  });

  const metricButtons = [
    { id: "views", label: "Views", icon: Eye },
    { id: "reach", label: "Reach", icon: Users },
    { id: "engagement", label: "Engagement", icon: Heart },
    { id: "conversions", label: "Conversions", icon: Target }
  ];
  const [comparisonType, setComparisonType] = useState<'week' | 'month' | 'custom'>('month');
  const [period1, setPeriod1] = useState<Date | undefined>(new Date());
  const [period2, setPeriod2] = useState<Date | undefined>(subMonths(new Date(), 1));
  const [isCalendar1Open, setIsCalendar1Open] = useState(false);
  const [isCalendar2Open, setIsCalendar2Open] = useState(false);

  const weekData = generateMockData('week');
  const monthData = generateMockData('month');
  const yearData = generateMockData('year');

  // Calculate percentage change for comparison
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Generate comparison data for custom periods
  const getComparisonData = () => {
    const currentPeriod = monthData[monthData.length - 1];
    const previousPeriod = monthData[monthData.length - 2];
    
    return selectedPlatforms.map(platform => {
      const current = currentPeriod[platform as keyof typeof currentPeriod] as number;
      const previous = previousPeriod[platform as keyof typeof previousPeriod] as number;
      const change = calculateChange(current, previous);
      
      return {
        platform,
        current,
        previous,
        change,
        color: platformColors[platform as keyof typeof platformColors]
      };
    });
  };

  const comparisonData = getComparisonData();

  return (
    <div className="space-y-6">
      {/* Date Range and Comparison Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Date Range & Period Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Range Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="flex gap-2 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "MMM dd") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                <span className="text-muted-foreground">to</span>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "MMM dd") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Comparison Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Comparison Type</label>
              <Select value={comparisonType} onValueChange={(value: 'week' | 'month' | 'custom') => setComparisonType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select comparison type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week on Week</SelectItem>
                  <SelectItem value="month">Month on Month</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance Comparison</TabsTrigger>
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          <TabsTrigger value="yearly">12 Month View</TabsTrigger>
          <TabsTrigger value="platforms">Platform Analysis</TabsTrigger>
        </TabsList>

        {/* Performance Comparison - Enhanced Visual */}
        <TabsContent value="performance" className="space-y-4">
          {/* Visual Overview Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="current" fill="hsl(var(--primary))" name="Current Period" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="previous" fill="hsl(var(--muted))" name="Previous Period" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonData.map((item) => (
              <Card key={item.platform} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium capitalize flex items-center justify-between">
                    {item.platform}
                    <div className={cn(
                      "flex items-center text-xs px-2 py-1 rounded-full",
                      item.change >= 0 ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20" : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20"
                    )}>
                      {item.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {Math.abs(item.change).toFixed(1)}%
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Current</span>
                      <span className="font-bold text-lg">{item.current.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Previous</span>
                      <span className="font-medium">{item.previous.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${Math.min((item.current / Math.max(item.current, item.previous)) * 100, 100)}%`,
                        backgroundColor: item.color 
                      }}
                    />
                  </div>
                  
                  <div 
                    className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                    style={{ 
                      width: `${Math.min(Math.abs(item.change) * 2, 100)}%`,
                      backgroundColor: item.color 
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Monthly Trends */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Month on Month Performance</span>
                <div className="flex gap-2">
                  {metricButtons.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <Button
                        key={metric.id}
                        size="sm"
                        variant={selectedMetric === metric.id ? "default" : "outline"}
                        onClick={() => setSelectedMetric(metric.id)}
                        className="flex items-center gap-1"
                      >
                        <Icon className="h-3 w-3" />
                        {metric.label}
                      </Button>
                    );
                  })}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Legend />
                  {selectedPlatforms.map(platform => (
                    <Line
                      key={platform}
                      type="monotone"
                      dataKey={platform}
                      stroke={platformColors[platform as keyof typeof platformColors]}
                      strokeWidth={2}
                      dot={{ fill: platformColors[platform as keyof typeof platformColors], strokeWidth: 2, r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 12 Month View */}
        <TabsContent value="yearly">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Last 12 Months Performance</span>
                <div className="flex gap-2">
                  {metricButtons.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <Button
                        key={metric.id}
                        size="sm"
                        variant={selectedMetric === metric.id ? "default" : "outline"}
                        onClick={() => setSelectedMetric(metric.id)}
                        className="flex items-center gap-1"
                      >
                        <Icon className="h-3 w-3" />
                        {metric.label}
                      </Button>
                    );
                  })}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={yearData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="period" 
                    stroke="hsl(var(--muted-foreground))"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Legend />
                  {selectedPlatforms.map(platform => (
                    <Bar
                      key={platform}
                      dataKey={platform}
                      fill={platformColors[platform as keyof typeof platformColors]}
                      radius={[2, 2, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Analysis */}
        <TabsContent value="platforms">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedPlatforms.slice(0, 4).map(platform => (
              <Card key={platform}>
                <CardHeader>
                  <CardTitle className="capitalize">{platform} Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={monthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)"
                        }} 
                      />
                      <Line
                        type="monotone"
                        dataKey={platform}
                        stroke={platformColors[platform as keyof typeof platformColors]}
                        strokeWidth={3}
                        dot={{ fill: platformColors[platform as keyof typeof platformColors], strokeWidth: 2, r: 6 }}
                      />
                      <ReferenceLine 
                        y={monthData.reduce((sum, item) => sum + (item[platform as keyof typeof item] as number), 0) / monthData.length}
                        stroke="hsl(var(--muted-foreground))"
                        strokeDasharray="5 5"
                        label="Average"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}