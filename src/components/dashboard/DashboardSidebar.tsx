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
import { Checkbox } from "@/components/ui/checkbox";
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
  {
    name: "Twitter",
    id: "twitter",
    color: "#1DA1F2",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
    followers: "125K"
  },
  {
    name: "Instagram", 
    id: "instagram",
    color: "#E4405F",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    followers: "89K"
  },
  {
    name: "YouTube",
    id: "youtube", 
    color: "#FF0000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    followers: "156K"
  },
  {
    name: "LinkedIn",
    id: "linkedin",
    color: "#0077B5", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    followers: "67K"
  },
  {
    name: "Medium",
    id: "medium",
    color: "#000000",
    logo: "https://miro.medium.com/v2/resize:fit:195/1*emiGsBgJu2KHWyjluhKXQw.png",
    followers: "34K"
  },
  {
    name: "Reddit",
    id: "reddit",
    color: "#FF4500",
    logo: "https://www.redditinc.com/assets/images/site/reddit-logo.png",
    followers: "45K"
  },
  {
    name: "Website",
    id: "website",
    color: "#22C55E",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
    followers: "23K"
  }
];

interface DashboardSidebarProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
}

export function DashboardSidebar({ selectedPlatforms, onPlatformToggle }: DashboardSidebarProps) {
  return (
    <Sidebar className="border-r border-primary/10 bg-card/50 backdrop-blur-sm">
      <SidebarContent className="pt-20">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-primary mb-4">
            Social Media Platforms
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {platforms.map((platform) => (
                <SidebarMenuItem key={platform.id}>
                  <SidebarMenuButton 
                    className={`
                      p-4 rounded-lg transition-all duration-200 hover:bg-primary/5 border
                      ${selectedPlatforms.includes(platform.id) 
                        ? 'bg-primary/10 border-primary/30 shadow-sm' 
                        : 'border-border/50 hover:border-primary/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedPlatforms.includes(platform.id)}
                          onCheckedChange={() => onPlatformToggle(platform.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm">
                          <img 
                            src={platform.logo} 
                            alt={`${platform.name} logo`}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div 
                            className="w-6 h-6 rounded flex items-center justify-center text-xs font-semibold text-white hidden"
                            style={{ backgroundColor: platform.color }}
                          >
                            {platform.name[0]}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-medium text-sm">{platform.name}</div>
                          <div className="text-xs text-muted-foreground">{platform.followers} followers</div>
                        </div>
                      </div>
                      
                      {selectedPlatforms.includes(platform.id) && (
                        <Badge 
                          variant="secondary"
                          className="bg-primary/20 text-primary border-primary/30 text-xs"
                        >
                          Active
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}