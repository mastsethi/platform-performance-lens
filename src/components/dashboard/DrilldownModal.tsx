import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Share, ExternalLink, Calendar, User } from "lucide-react";

interface DrilldownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: string;
  metric: string;
}

const mockPosts = [
  {
    id: 1,
    text: "Exciting news! Our latest product launch exceeded all expectations...",
    image: "/placeholder.svg",
    date: "2024-01-15",
    author: "Sarah Johnson",
    metrics: {
      likes: 1234,
      comments: 89,
      shares: 156,
      reach: 12500
    }
  },
  {
    id: 2,
    text: "Behind the scenes: Here's how our team built this amazing feature...",
    image: "/placeholder.svg",
    date: "2024-01-12",
    author: "Mike Chen",
    metrics: {
      likes: 892,
      comments: 67,
      shares: 134,
      reach: 9800
    }
  },
  {
    id: 3,
    text: "Customer spotlight: Amazing success story from our users!",
    image: "/placeholder.svg",
    date: "2024-01-10",
    author: "Emma Davis",
    metrics: {
      likes: 756,
      comments: 45,
      shares: 89,
      reach: 8900
    }
  }
];

const mockCampaigns = [
  {
    id: 1,
    name: "Q1 Product Launch",
    posts: 12,
    totalReach: 45600,
    engagement: 8.5,
    status: "active"
  },
  {
    id: 2,
    name: "Holiday Special",
    posts: 8,
    totalReach: 32100,
    engagement: 7.2,
    status: "completed"
  },
  {
    id: 3,
    name: "Brand Awareness",
    posts: 15,
    totalReach: 67800,
    engagement: 9.1,
    status: "active"
  }
];

export function DrilldownModal({ open, onOpenChange, platform, metric }: DrilldownModalProps) {
  const [sortBy, setSortBy] = useState<'engagement' | 'reach' | 'date'>('engagement');

  const sortedPosts = [...mockPosts].sort((a, b) => {
    switch (sortBy) {
      case 'engagement':
        return (b.metrics.likes + b.metrics.comments + b.metrics.shares) - 
               (a.metrics.likes + a.metrics.comments + a.metrics.shares);
      case 'reach':
        return b.metrics.reach - a.metrics.reach;
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default:
        return 0;
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 capitalize">
            {platform} - {metric} Breakdown
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Top Posts</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Top Performing Posts</h3>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'engagement' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('engagement')}
                >
                  Engagement
                </Button>
                <Button
                  variant={sortBy === 'reach' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('reach')}
                >
                  Reach
                </Button>
                <Button
                  variant={sortBy === 'date' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('date')}
                >
                  Recent
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {sortedPosts.map((post, index) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {post.author}
                          <Calendar className="h-4 w-4 ml-2" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{post.text}</p>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-red-500">
                          <Heart className="h-4 w-4" />
                          <span className="font-semibold">{post.metrics.likes.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-500">
                          <MessageCircle className="h-4 w-4" />
                          <span className="font-semibold">{post.metrics.comments}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Comments</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-green-500">
                          <Share className="h-4 w-4" />
                          <span className="font-semibold">{post.metrics.shares}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Shares</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-primary">{post.metrics.reach.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Reach</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <h3 className="text-lg font-semibold">Active Campaigns</h3>
            <div className="grid gap-4">
              {mockCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{campaign.posts}</div>
                        <div className="text-sm text-muted-foreground">Posts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{campaign.totalReach.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Reach</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{campaign.engagement}%</div>
                        <div className="text-sm text-muted-foreground">Engagement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hashtags" className="space-y-4">
            <h3 className="text-lg font-semibold">Top Hashtags</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['#productlaunch', '#innovation', '#customerFirst', '#teamWork', '#success', '#growth'].map((hashtag, index) => (
                <Card key={hashtag} className="text-center p-4">
                  <div className="text-lg font-semibold text-primary">{hashtag}</div>
                  <div className="text-sm text-muted-foreground">{Math.floor(Math.random() * 50) + 10} posts</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {(Math.random() * 10 + 5).toFixed(1)}% engagement
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}