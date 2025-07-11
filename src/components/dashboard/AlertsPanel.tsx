import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, TrendingDown, Bell, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'info' | 'danger';
  title: string;
  message: string;
  platform?: string;
  metric?: string;
  change?: number;
  timestamp: Date;
  dismissed?: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'danger',
    title: 'Engagement Down Significantly',
    message: 'Instagram engagement dropped 30% this week compared to last week',
    platform: 'instagram',
    metric: 'engagement',
    change: -30,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    type: 'success',
    title: 'Conversions Surge',
    message: 'LinkedIn conversions increased 25% vs last period',
    platform: 'linkedin',
    metric: 'conversions',
    change: 25,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    id: '3',
    type: 'warning',
    title: 'Reach Plateau',
    message: 'YouTube reach has remained flat for 5 consecutive days',
    platform: 'youtube',
    metric: 'reach',
    change: 0,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  },
  {
    id: '4',
    type: 'info',
    title: 'New Peak Performance',
    message: 'Twitter achieved highest daily reach of 45K users',
    platform: 'twitter',
    metric: 'reach',
    change: 15,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 hours ago
  }
];

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'success':
      return CheckCircle;
    case 'warning':
      return AlertTriangle;
    case 'danger':
      return AlertTriangle;
    case 'info':
      return Bell;
    default:
      return Bell;
  }
};

const getAlertColors = (type: Alert['type']) => {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/20',
        border: 'border-emerald-200 dark:border-emerald-800',
        text: 'text-emerald-800 dark:text-emerald-300',
        icon: 'text-emerald-600 dark:text-emerald-400'
      };
    case 'warning':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/20',
        border: 'border-amber-200 dark:border-amber-800',
        text: 'text-amber-800 dark:text-amber-300',
        icon: 'text-amber-600 dark:text-amber-400'
      };
    case 'danger':
      return {
        bg: 'bg-red-50 dark:bg-red-950/20',
        border: 'border-red-200 dark:border-red-800',
        text: 'text-red-800 dark:text-red-300',
        icon: 'text-red-600 dark:text-red-400'
      };
    case 'info':
      return {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-800 dark:text-blue-300',
        icon: 'text-blue-600 dark:text-blue-400'
      };
    default:
      return {
        bg: 'bg-muted/50',
        border: 'border-border',
        text: 'text-foreground',
        icon: 'text-muted-foreground'
      };
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInHours > 0) {
    return `${diffInHours}h ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m ago`;
  } else {
    return 'Just now';
  }
};

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showDismissed, setShowDismissed] = useState(false);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  const clearAllAlerts = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, dismissed: true })));
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const dismissedAlerts = alerts.filter(alert => alert.dismissed);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Performance Alerts
            {activeAlerts.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeAlerts.length}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {activeAlerts.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllAlerts}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDismissed(!showDismissed)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showDismissed ? 'Hide' : 'Show'} Dismissed
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeAlerts.length === 0 && !showDismissed && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No active alerts</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        )}

        {/* Active Alerts */}
        {activeAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          const colors = getAlertColors(alert.type);

          return (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-lg border transition-all duration-200 hover:shadow-sm",
                colors.bg,
                colors.border
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", colors.icon)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={cn("font-medium", colors.text)}>
                        {alert.title}
                      </h4>
                      {alert.change !== undefined && (
                        <Badge 
                          variant={alert.change >= 0 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {alert.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(alert.change)}%
                        </Badge>
                      )}
                    </div>
                    <p className={cn("text-sm", colors.text, "opacity-90")}>
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {alert.platform && (
                        <Badge variant="outline" className="text-xs capitalize">
                          {alert.platform}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAlert(alert.id)}
                  className="flex-shrink-0 h-8 w-8 p-0 hover:bg-background/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}

        {/* Dismissed Alerts */}
        {showDismissed && dismissedAlerts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pt-4 border-t">
              <h5 className="text-sm font-medium text-muted-foreground">
                Dismissed Alerts
              </h5>
            </div>
            {dismissedAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);

              return (
                <div
                  key={alert.id}
                  className="p-4 rounded-lg border bg-muted/30 border-muted opacity-60"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-muted-foreground">
                        {alert.title}
                      </h4>
                      <p className="text-sm text-muted-foreground opacity-80">
                        {alert.message}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}