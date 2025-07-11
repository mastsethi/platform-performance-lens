import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, RefreshCw, Settings, BarChart3, Users, Target, TrendingUp, FileDown, FileSpreadsheet, FileImage, FileText } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface DateRange {
  from: Date;
  to: Date;
}

interface DashboardHeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  selectedPlatform: string;
  selectedAccount: string;
  selectedTeamMember: string;
  selectedMetric: string;
  onPlatformChange: (platform: string) => void;
  onAccountChange: (account: string) => void;
  onTeamMemberChange: (member: string) => void;
  onMetricChange: (metric: string) => void;
}

export function DashboardHeader({ 
  dateRange, 
  onDateRangeChange,
  selectedPlatform,
  selectedAccount,
  selectedTeamMember,
  selectedMetric,
  onPlatformChange,
  onAccountChange,
  onTeamMemberChange,
  onMetricChange
}: DashboardHeaderProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Mock data
  const mockPlatforms = [
    { id: "all", name: "All Platforms", accounts: [] },
    { id: "twitter", name: "Twitter", accounts: [{ id: "twitter_main", name: "@company" }, { id: "twitter_support", name: "@company_support" }] },
    { id: "youtube", name: "YouTube", accounts: [{ id: "youtube_main", name: "Company Channel" }, { id: "youtube_tutorial", name: "Tutorial Channel" }] },
    { id: "linkedin", name: "LinkedIn", accounts: [{ id: "linkedin_company", name: "Company Page" }, { id: "linkedin_ceo", name: "CEO Profile" }] },
  ];

  const mockTeamMembers = [
    { id: "all", name: "All Team Members", role: "" },
    { id: "john", name: "John Smith", role: "Social Media Manager" },
    { id: "sarah", name: "Sarah Johnson", role: "Content Creator" },
    { id: "mike", name: "Mike Chen", role: "Community Manager" },
  ];

  const performanceMetrics = [
    { id: "views", name: "Views", icon: BarChart3 },
    { id: "reach", name: "Reach", icon: Users },
    { id: "engagement", name: "Engagement", icon: Target },
    { id: "conversions", name: "Conversions", icon: TrendingUp },
  ];

  const selectedPlatformData = mockPlatforms.find(p => p.id === selectedPlatform);
  const selectedMetricData = performanceMetrics.find(m => m.id === selectedMetric);

  const handleExport = (format: 'csv' | 'excel' | 'pdf' | 'png') => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`);
    // Implement actual export logic here
  };

  const handleRefresh = () => {
    toast.success("Data refreshed successfully!");
    // Implement actual refresh logic here
  };

  return (
    <header className="border-b border-primary/20 bg-card/80 backdrop-blur-lg sticky top-0 z-10 shadow-brand">
      <div className="p-4 space-y-4">
        {/* Top row with sidebar trigger and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="p-2 hover:bg-primary/10 rounded-lg transition-colors border border-primary/20" />
            <div className="text-sm text-muted-foreground">
              Last updated: {format(new Date(), "MMM dd, HH:mm")}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Picker */}
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from && dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                    </>
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      onDateRangeChange({ from: range.from, to: range.to });
                      setIsCalendarOpen(false);
                    }
                  }}
                  numberOfMonths={2}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            {/* Quick Actions */}
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('excel')}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('png')}>
                  <FileImage className="h-4 w-4 mr-2" />
                  Export Charts as PNG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Performance Filters Row */}
        <div className="flex items-center gap-4 p-4 bg-gradient-brand/5 rounded-lg border border-primary/20 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <BarChart3 className="h-4 w-4" />
            Performance Filters
          </div>
          
          <div className="flex items-center gap-4 flex-1">
            {/* Platform Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Platform</label>
              <Select value={selectedPlatform} onValueChange={onPlatformChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  {mockPlatforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Account Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Account</label>
              <Select 
                value={selectedAccount} 
                onValueChange={onAccountChange}
                disabled={selectedPlatform === "all"}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  {selectedPlatformData?.accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Team Member Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Team Member</label>
              <Select value={selectedTeamMember} onValueChange={onTeamMemberChange}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="All Team Members" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Performance Metric Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Performance Metric</label>
              <Select value={selectedMetric} onValueChange={onMetricChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Views" />
                </SelectTrigger>
                <SelectContent>
                  {performanceMetrics.map((metric) => (
                    <SelectItem key={metric.id} value={metric.id}>
                      <div className="flex items-center gap-2">
                        <metric.icon className="h-4 w-4" />
                        {metric.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}