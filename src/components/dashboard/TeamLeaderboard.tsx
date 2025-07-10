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
    avatar: "/placeholder.svg",
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
    avatar: "/placeholder.svg",
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
    avatar: "/placeholder.svg",
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
    avatar: "/placeholder.svg",
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
    avatar: "/placeholder.svg",
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
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
              className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(member.rank)}
                </div>
                
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                  <div className="text-xs text-muted-foreground">
                    {member.accountsManaged} accounts managed
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-lg">{getMetricValue(member)}</div>
                <Badge 
                  variant="secondary" 
                  className={`flex items-center gap-1 ${
                    member.trend === "up" 
                      ? "text-green-400 bg-green-400/10" 
                      : "text-red-400 bg-red-400/10"
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