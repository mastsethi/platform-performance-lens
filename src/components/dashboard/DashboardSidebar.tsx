import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Hash,
  Globe,
  BarChart3
} from "lucide-react";

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, color: "twitter", accounts: 3 },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "instagram", accounts: 2 },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "youtube", accounts: 1 },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "linkedin", accounts: 2 },
  { id: "medium", name: "Medium", icon: Hash, color: "medium", accounts: 1 },
  { id: "reddit", name: "Reddit", icon: BarChart3, color: "reddit", accounts: 1 },
  { id: "website", name: "Website", icon: Globe, color: "website", accounts: 1 },
];

interface DashboardSidebarProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
}

export function DashboardSidebar({ selectedPlatforms, onPlatformToggle }: DashboardSidebarProps) {
  return (
    <Sidebar className="w-72 border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-semibold">Analytics</h2>
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platforms</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                
                return (
                  <SidebarMenuItem key={platform.id}>
                    <SidebarMenuButton
                      onClick={() => onPlatformToggle(platform.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        isSelected 
                          ? 'bg-accent text-accent-foreground shadow-sm' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${platform.color}/10`}>
                          <Icon className={`h-4 w-4 text-${platform.color}`} />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{platform.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {platform.accounts} account{platform.accounts > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <Switch 
                        checked={isSelected}
                        onChange={() => {}} // Handled by parent click
                        className="pointer-events-none"
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Platforms</span>
                <Badge variant="secondary">{selectedPlatforms.length}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Accounts</span>
                <Badge variant="secondary">
                  {platforms
                    .filter(p => selectedPlatforms.includes(p.id))
                    .reduce((sum, p) => sum + p.accounts, 0)}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Data Sources</span>
                <Badge variant="outline">Manual + API</Badge>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}