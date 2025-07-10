import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PerformanceFilters } from "./PerformanceFilters";
import { TeamLeaderboard } from "./TeamLeaderboard";
import { useState } from "react";

const mockData = [
  { date: "Jan", twitter: 4000, instagram: 2400, youtube: 2400, linkedin: 1800, medium: 800, reddit: 600, website: 1200 },
  { date: "Feb", twitter: 3000, instagram: 1398, youtube: 2210, linkedin: 2000, medium: 900, reddit: 700, website: 1400 },
  { date: "Mar", twitter: 2000, instagram: 9800, youtube: 2290, linkedin: 2500, medium: 1100, reddit: 800, website: 1600 },
  { date: "Apr", twitter: 2780, instagram: 3908, youtube: 2000, linkedin: 2200, medium: 1200, reddit: 900, website: 1800 },
  { date: "May", twitter: 1890, instagram: 4800, youtube: 2181, linkedin: 2400, medium: 1000, reddit: 750, website: 1500 },
  { date: "Jun", twitter: 2390, instagram: 3800, youtube: 2500, linkedin: 2600, medium: 1300, reddit: 850, website: 1700 },
];

const platformColors = {
  twitter: "#1DA1F2",
  instagram: "#E4405F", 
  youtube: "#FF0000",
  linkedin: "#0077B5",
  medium: "#000000",
  reddit: "#FF4500",
  website: "#22C55E"
};

interface ChartsProps {
  selectedPlatforms: string[];
  dateRange: { from: Date; to: Date };
}

export function Charts({ selectedPlatforms, dateRange }: ChartsProps) {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedTeamMember, setSelectedTeamMember] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState("views");

  const pieData = selectedPlatforms.map(platform => ({
    name: platform,
    value: mockData.reduce((sum, item) => sum + (item[platform as keyof typeof item] as number || 0), 0),
    color: platformColors[platform as keyof typeof platformColors]
  }));

  return (
    <div className="space-y-6">
      {/* Performance Filters */}
      <PerformanceFilters
        selectedPlatform={selectedPlatform}
        selectedAccount={selectedAccount}
        selectedTeamMember={selectedTeamMember}
        selectedMetric={selectedMetric}
        onPlatformChange={setSelectedPlatform}
        onAccountChange={setSelectedAccount}
        onTeamMemberChange={setSelectedTeamMember}
        onMetricChange={setSelectedMetric}
      />

      {/* Team Leaderboard */}
      <TeamLeaderboard metric={selectedMetric as 'reach' | 'views' | 'engagement' | 'conversions'} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Trends Over Time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Performance Trends
              <span className="text-sm font-normal text-muted-foreground">
                ({selectedPlatforms.length} platforms selected)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
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

        {/* Bar Chart - Platform Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                {selectedPlatforms.slice(0, 3).map(platform => (
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

        {/* Pie Chart - Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}