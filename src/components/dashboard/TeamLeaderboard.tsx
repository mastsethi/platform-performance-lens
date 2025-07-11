import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  TrendingDown,
  Users,
  Eye,
  Heart,
  Target
} from "lucide-react";

const mockTeamData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    role: "Social Media Manager",
    accountsManaged: 12,
    totalReach: 850000,
    totalViews: 420000,
    engagement: 89000,
    conversions: 2400,
    performance: "+25.4%",
    trend: "up",
    rank: 1
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "Content Creator",
    accountsManaged: 8,
    totalReach: 620000,
    totalViews: 380000,
    engagement: 67000,
    conversions: 1800,
    performance: "+18.2%",
    trend: "up",
    rank: 2
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    role: "Marketing Specialist",
    accountsManaged: 6,
    totalReach: 450000,
    totalViews: 290000,
    engagement: 45000,
    conversions: 1200,
    performance: "+12.7%",
    trend: "up",
    rank: 3
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "Digital Strategist",
    accountsManaged: 4,
    totalReach: 320000,
    totalViews: 180000,
    engagement: 32000,
    conversions: 950,
    performance: "-5.1%",
    trend: "down",
    rank: 4
  },
  {
    id: 5,
    name: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    role: "Community Manager",
    accountsManaged: 5,
    totalReach: 280000,
    totalViews: 160000,
    engagement: 28000,
    conversions: 720,
    performance: "+8.9%",
    trend: "up",
    rank: 5
  }
];

interface TeamLeaderboardProps {
  metric: 'reach' | 'views' | 'engagement' | 'conversions';
}

export function TeamLeaderboard({ metric }: TeamLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getMetricValue = (member: typeof mockTeamData[0]) => {
    switch (metric) {
      case 'reach':
        return member.totalReach.toLocaleString();
      case 'views':
        return member.totalViews.toLocaleString();
      case 'engagement':
        return member.engagement.toLocaleString();
      case 'conversions':
        return member.conversions.toLocaleString();
      default:
        return member.totalReach.toLocaleString();
    }
  };

  const getMetricIcon = () => {
    switch (metric) {
      case 'reach':
        return <Users className="h-4 w-4" />;
      case 'views':
        return <Eye className="h-4 w-4" />;
      case 'engagement':
        return <Heart className="h-4 w-4" />;
      case 'conversions':
        return <Target className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-primary/20 shadow-brand">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          {getMetricIcon()}
          Team Leaderboard - {metric.charAt(0).toUpperCase() + metric.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTeamData.map((member) => {
          const TrendIcon = member.trend === "up" ? TrendingUp : TrendingDown;
          
          return (
            <div
              key={member.id}
              className={`
                flex items-center justify-between p-6 rounded-xl border transition-all duration-300 hover:shadow-lg
                ${member.rank <= 3 
                  ? 'border-primary/30 bg-gradient-to-r from-primary/5 to-transparent shadow-sm' 
                  : 'border-border hover:border-primary/20 bg-card/50'
                }
              `}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-10">
                  {getRankIcon(member.rank)}
                </div>
                
                <Avatar className="h-14 w-14 ring-2 ring-primary/20 shadow-lg">
                  <AvatarImage 
                    src={member.avatar} 
                    alt={member.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-primary text-white font-semibold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-semibold text-xl">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                  <div className="text-xs text-muted-foreground">
                    {member.accountsManaged} accounts managed
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-2xl text-primary">{getMetricValue(member)}</div>
                <Badge 
                  variant="secondary" 
                  className={`flex items-center gap-1 ${
                    member.trend === "up" 
                      ? "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800" 
                      : "text-red-700 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800"
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {member.performance}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}