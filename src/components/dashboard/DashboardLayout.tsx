import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { KPICards } from "./KPICards";
import { Charts } from "./Charts";
import { ComparisonCharts } from "./ComparisonCharts";
import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { DataEntryDialog } from "./DataEntryDialog";
import { ExportDialog } from "./ExportDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamLeaderboard } from "./TeamLeaderboard";

export function DashboardLayout() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "twitter", "instagram", "youtube", "linkedin", "medium", "reddit", "website"
  ]);
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date()
  });
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(false);

  // Global performance filters
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedTeamMember, setSelectedTeamMember] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState("views");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        {/* Floating Brand Header */}
        <div className="fixed top-4 left-4 z-50 flex items-center gap-3 bg-card/90 backdrop-blur-lg border border-primary/20 rounded-xl px-4 py-2 shadow-brand">
          <img 
            src="/lovable-uploads/528e1ccf-2e57-4049-82bd-7751449dfb0e.png" 
            alt="Brand Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Social Media Dashboard
          </h1>
        </div>

        <DashboardSidebar 
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={(platform) => {
            setSelectedPlatforms(prev => 
              prev.includes(platform) 
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
            );
          }}
        />
        
        <main className="flex-1 flex flex-col">
          <DashboardHeader 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedPlatform={selectedPlatform}
            selectedAccount={selectedAccount}
            selectedTeamMember={selectedTeamMember}
            selectedMetric={selectedMetric}
            onPlatformChange={setSelectedPlatform}
            onAccountChange={setSelectedAccount}
            onTeamMemberChange={setSelectedTeamMember}
            onMetricChange={setSelectedMetric}
          />
          
          <div className="flex-1 p-6 pt-20 space-y-6">
            {/* Action Bar */}
            <div className="flex justify-end items-center">
              <div className="flex gap-3">
                <ExportDialog>
                  <Button variant="outline" className="hover:shadow-glow border-primary/20">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </ExportDialog>
                <Button 
                  onClick={() => setIsDataEntryOpen(true)}
                  className="bg-gradient-primary hover:shadow-glow"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Data
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <KPICards 
              selectedPlatforms={selectedPlatforms} 
              dateRange={dateRange}
            />

            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="data">Data Table</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Charts 
                  selectedPlatforms={selectedPlatforms} 
                  dateRange={dateRange}
                />
              </TabsContent>

              <TabsContent value="comparisons">
                <ComparisonCharts selectedPlatforms={selectedPlatforms} />
              </TabsContent>

              <TabsContent value="leaderboard">
                <TeamLeaderboard metric={selectedMetric as 'reach' | 'views' | 'engagement' | 'conversions'} />
              </TabsContent>

              <TabsContent value="data">
                <DataTable 
                  selectedPlatforms={selectedPlatforms} 
                  dateRange={dateRange}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <DataEntryDialog 
          open={isDataEntryOpen}
          onOpenChange={setIsDataEntryOpen}
        />
      </div>
    </SidebarProvider>
  );
}