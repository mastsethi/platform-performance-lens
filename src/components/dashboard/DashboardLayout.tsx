import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { KPICards } from "./KPICards";
import { Charts } from "./Charts";
import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataEntryDialog } from "./DataEntryDialog";

export function DashboardLayout() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "twitter", "instagram", "youtube", "linkedin", "medium", "reddit", "website"
  ]);
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date()
  });
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
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
          />
          
          <div className="flex-1 p-6 space-y-6">
            {/* Action Bar */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Social Media Dashboard
              </h1>
              <Button 
                onClick={() => setIsDataEntryOpen(true)}
                className="bg-gradient-primary hover:shadow-glow"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Data
              </Button>
            </div>

            {/* KPI Cards */}
            <KPICards 
              selectedPlatforms={selectedPlatforms} 
              dateRange={dateRange}
            />

            {/* Charts */}
            <Charts 
              selectedPlatforms={selectedPlatforms} 
              dateRange={dateRange}
            />

            {/* Data Table */}
            <DataTable 
              selectedPlatforms={selectedPlatforms} 
              dateRange={dateRange}
            />
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