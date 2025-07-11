import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Target, TrendingUp, Calendar, Clock, MapPin } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, AreaChart } from "recharts";
import { useState } from "react";

// Enhanced mock data with more series
const mockData = [
  { date: "Jan", twitter: 4000, instagram: 2400, youtube: 2400, linkedin: 1800, medium: 800, reddit: 600, website: 1200, engagement: 3200, reach: 5200 },
  { date: "Feb", twitter: 3000, instagram: 1398, youtube: 2210, linkedin: 2000, medium: 900, reddit: 700, website: 1400, engagement: 2800, reach: 4800 },
  { date: "Mar", twitter: 2000, instagram: 9800, youtube: 2290, linkedin: 2500, medium: 1100, reddit: 800, website: 1600, engagement: 4100, reach: 6200 },
  { date: "Apr", twitter: 2780, instagram: 3908, youtube: 2000, linkedin: 2200, medium: 1200, reddit: 900, website: 1800, engagement: 3500, reach: 5500 },
  { date: "May", twitter: 1890, instagram: 4800, youtube: 2181, linkedin: 2400, medium: 1000, reddit: 750, website: 1500, engagement: 3800, reach: 5800 },
  { date: "Jun", twitter: 2390, instagram: 3800, youtube: 2500, linkedin: 2600, medium: 1300, reddit: 850, website: 1700, engagement: 4200, reach: 6400 },
];

// Heatmap data for engagement by time/day
const heatmapData = [
  { day: 'Mon', hour: '00-06', value: 20 }, { day: 'Mon', hour: '06-12', value: 80 }, { day: 'Mon', hour: '12-18', value: 95 }, { day: 'Mon', hour: '18-24', value: 70 },
  { day: 'Tue', hour: '00-06', value: 15 }, { day: 'Tue', hour: '06-12', value: 85 }, { day: 'Tue', hour: '12-18', value: 90 }, { day: 'Tue', hour: '18-24', value: 75 },
  { day: 'Wed', hour: '00-06', value: 25 }, { day: 'Wed', hour: '06-12', value: 90 }, { day: 'Wed', hour: '12-18', value: 100 }, { day: 'Wed', hour: '18-24', value: 80 },
  { day: 'Thu', hour: '00-06', value: 20 }, { day: 'Thu', hour: '06-12', value: 88 }, { day: 'Thu', hour: '12-18', value: 95 }, { day: 'Thu', hour: '18-24', value: 72 },
  { day: 'Fri', hour: '00-06', value: 18 }, { day: 'Fri', hour: '06-12', value: 92 }, { day: 'Fri', hour: '12-18', value: 98 }, { day: 'Fri', hour: '18-24', value: 85 },
  { day: 'Sat', hour: '00-06', value: 30 }, { day: 'Sat', hour: '06-12', value: 70 }, { day: 'Sat', hour: '12-18', value: 85 }, { day: 'Sat', hour: '18-24', value: 90 },
  { day: 'Sun', hour: '00-06', value: 35 }, { day: 'Sun', hour: '06-12', value: 65 }, { day: 'Sun', hour: '12-18', value: 80 }, { day: 'Sun', hour: '18-24', value: 95 },
];

const platformColors = {
  twitter: "#1DA1F2",
  instagram: "#E4405F", 
  youtube: "#FF0000",
  linkedin: "#0077B5",
  medium: "#000000",
  reddit: "#FF4500",
  website: "#22C55E",
  engagement: "#8B5CF6",
  reach: "#F59E0B"
};

interface ChartsProps {
  selectedPlatforms: string[];
  dateRange: { from: Date; to: Date };
}

export function Charts({ selectedPlatforms, dateRange }: ChartsProps) {
  // Metric selection state for charts
  const [activeMetric, setActiveMetric] = useState<'views' | 'reach' | 'engagement' | 'conversions'>('views');

  const metricButtons = [
    { id: "views", label: "Views", icon: BarChart3 },
    { id: "reach", label: "Reach", icon: Users },
    { id: "engagement", label: "Engagement", icon: Target },
    { id: "conversions", label: "Conversions", icon: TrendingUp },
  ];

  const pieData = selectedPlatforms.map(platform => ({
    name: platform,
    value: mockData.reduce((sum, item) => sum + (item[platform as keyof typeof item] as number || 0), 0),
    color: platformColors[platform as keyof typeof platformColors]
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg animate-fade-in">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Dashboard with Multiple Chart Types */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="distribution">Platform Distribution</TabsTrigger>
          <TabsTrigger value="comparison">Multi-Series Analysis</TabsTrigger>
          <TabsTrigger value="heatmap">Engagement Heatmap</TabsTrigger>
        </TabsList>

        {/* Performance Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Line Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Trends
                    <span className="text-sm font-normal text-muted-foreground">
                      ({selectedPlatforms.length} platforms selected)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {metricButtons.map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <Button
                          key={metric.id}
                          size="sm"
                          variant={activeMetric === metric.id ? "default" : "outline"}
                          onClick={() => setActiveMetric(metric.id as 'views' | 'reach' | 'engagement' | 'conversions')}
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
                  <AreaChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      {selectedPlatforms.map((platform, index) => (
                        <linearGradient key={platform} id={`color${platform}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={platformColors[platform as keyof typeof platformColors]} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={platformColors[platform as keyof typeof platformColors]} stopOpacity={0.1}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {selectedPlatforms.map(platform => (
                      <Area
                        key={platform}
                        type="monotone"
                        dataKey={platform}
                        stroke={platformColors[platform as keyof typeof platformColors]}
                        fill={`url(#color${platform})`}
                        strokeWidth={2}
                        dot={{ fill: platformColors[platform as keyof typeof platformColors], strokeWidth: 2, r: 4 }}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart - Platform Comparison */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockData.slice(-3)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip content={<CustomTooltip />} />
                    {selectedPlatforms.slice(0, 3).map(platform => (
                      <Bar
                        key={platform}
                        dataKey={platform}
                        fill={platformColors[platform as keyof typeof platformColors]}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart - Platform Distribution */}
            <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Platform Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Platform Distribution Tab */}
        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reach Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart layout="horizontal" data={pieData.slice(0, 4)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Multi-Series Analysis Tab */}
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Reach vs Engagement Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={mockData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="reach" fill="#F59E0B" name="Reach" radius={[2, 2, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#8B5CF6" strokeWidth={3} name="Engagement" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Heatmap Tab */}
        <TabsContent value="heatmap">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Engagement Heatmap - Best Times to Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2 text-xs text-center">
                  <div></div>
                  <div>00-06</div>
                  <div>06-12</div>
                  <div>12-18</div>
                  <div>18-24</div>
                </div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="grid grid-cols-5 gap-2">
                    <div className="text-xs font-medium py-2">{day}</div>
                    {['00-06', '06-12', '12-18', '18-24'].map(hour => {
                      const dataPoint = heatmapData.find(d => d.day === day && d.hour === hour);
                      const intensity = dataPoint ? dataPoint.value : 0;
                      const opacity = intensity / 100;
                      return (
                        <div
                          key={hour}
                          className="h-8 rounded border flex items-center justify-center text-xs transition-all duration-300 hover:scale-110"
                          style={{
                            backgroundColor: `hsl(var(--primary) / ${opacity})`,
                            color: opacity > 0.5 ? 'white' : 'hsl(var(--foreground))'
                          }}
                          title={`${day} ${hour}: ${intensity}% engagement`}
                        >
                          {intensity}%
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
                  <span>Low</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: `hsl(var(--primary) / ${(i + 1) / 10})` }}
                      />
                    ))}
                  </div>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}