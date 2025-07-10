import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, BarChart3, Target } from "lucide-react";

const mockPlatforms = [
  { id: "twitter", name: "Twitter", accounts: ["@company", "@ceo", "@products"] },
  { id: "instagram", name: "Instagram", accounts: ["@company_official", "@behind_scenes"] },
  { id: "youtube", name: "YouTube", accounts: ["Company Channel", "Tutorial Channel"] },
  { id: "linkedin", name: "LinkedIn", accounts: ["Company Page", "CEO Profile"] },
  { id: "medium", name: "Medium", accounts: ["@company-blog", "@tech-insights"] },
  { id: "reddit", name: "Reddit", accounts: ["u/company_official"] },
  { id: "website", name: "Website", accounts: ["Main Site", "Blog", "Landing Pages"] }
];

const mockTeamMembers = [
  { id: "sarah", name: "Sarah Johnson", role: "Social Media Manager" },
  { id: "mike", name: "Mike Chen", role: "Content Creator" },
  { id: "emily", name: "Emily Rodriguez", role: "Marketing Specialist" },
  { id: "david", name: "David Kim", role: "Digital Strategist" },
  { id: "lisa", name: "Lisa Wang", role: "Community Manager" }
];

const performanceMetrics = [
  { id: "views", name: "Views", icon: "📊" },
  { id: "reach", name: "Reach", icon: "👥" },
  { id: "engagement", name: "Engagement", icon: "❤️" },
  { id: "conversions", name: "Conversions", icon: "🎯" }
];

interface PerformanceFiltersProps {
  selectedPlatform: string;
  selectedAccount: string;
  selectedTeamMember: string;
  selectedMetric: string;
  onPlatformChange: (platform: string) => void;
  onAccountChange: (account: string) => void;
  onTeamMemberChange: (member: string) => void;
  onMetricChange: (metric: string) => void;
}

export function PerformanceFilters({
  selectedPlatform,
  selectedAccount,
  selectedTeamMember,
  selectedMetric,
  onPlatformChange,
  onAccountChange,
  onTeamMemberChange,
  onMetricChange
}: PerformanceFiltersProps) {
  const selectedPlatformData = mockPlatforms.find(p => p.id === selectedPlatform);
  const availableAccounts = selectedPlatformData?.accounts || [];

  return (
    <div className="bg-card/50 border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <BarChart3 className="h-4 w-4" />
        Performance Filters
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Platform Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Platform
          </label>
          <Select value={selectedPlatform} onValueChange={onPlatformChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {mockPlatforms.map((platform) => (
                <SelectItem key={platform.id} value={platform.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{platform.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {platform.accounts.length}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Account Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Account</label>
          <Select 
            value={selectedAccount} 
            onValueChange={onAccountChange}
            disabled={!selectedPlatform || selectedPlatform === "all"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              {availableAccounts.map((account) => (
                <SelectItem key={account} value={account}>
                  {account}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Team Member Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Member
          </label>
          <Select value={selectedTeamMember} onValueChange={onTeamMemberChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Team Members</SelectItem>
              {mockTeamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  <div className="flex flex-col">
                    <span>{member.name}</span>
                    <span className="text-xs text-muted-foreground">{member.role}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Performance Metric Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4" />
            Performance Metric
          </label>
          <Select value={selectedMetric} onValueChange={onMetricChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              {performanceMetrics.map((metric) => (
                <SelectItem key={metric.id} value={metric.id}>
                  <div className="flex items-center gap-2">
                    <span>{metric.icon}</span>
                    <span>{metric.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Summary */}
      <div className="flex flex-wrap gap-2 pt-2 border-t">
        {selectedPlatform && selectedPlatform !== "all" && (
          <Badge variant="outline">
            Platform: {mockPlatforms.find(p => p.id === selectedPlatform)?.name}
          </Badge>
        )}
        {selectedAccount && selectedAccount !== "all" && (
          <Badge variant="outline">
            Account: {selectedAccount}
          </Badge>
        )}
        {selectedTeamMember && selectedTeamMember !== "all" && (
          <Badge variant="outline">
            Member: {mockTeamMembers.find(m => m.id === selectedTeamMember)?.name}
          </Badge>
        )}
        {selectedMetric && (
          <Badge variant="outline">
            Metric: {performanceMetrics.find(m => m.id === selectedMetric)?.name}
          </Badge>
        )}
      </div>
    </div>
  );
}