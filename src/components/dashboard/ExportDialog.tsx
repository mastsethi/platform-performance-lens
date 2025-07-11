import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet, FileText, Image, Calendar } from "lucide-react";
import { toast } from "sonner";

interface ExportDialogProps {
  children: React.ReactNode;
}

export function ExportDialog({ children }: ExportDialogProps) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'pdf' | 'png'>('csv');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['reach', 'views', 'engagement']);
  const [dateRange, setDateRange] = useState('last30days');
  const [includePlatforms, setIncludePlatforms] = useState<string[]>(['twitter', 'instagram', 'linkedin']);

  const metrics = [
    { id: 'reach', label: 'Total Reach' },
    { id: 'views', label: 'Total Views' },
    { id: 'engagement', label: 'Engagements' },
    { id: 'clicks', label: 'Clicks' },
    { id: 'leads', label: 'Leads' },
    { id: 'conversions', label: 'Conversions' }
  ];

  const platforms = [
    { id: 'twitter', label: 'Twitter' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'medium', label: 'Medium' },
    { id: 'reddit', label: 'Reddit' }
  ];

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handlePlatformToggle = (platformId: string) => {
    setIncludePlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleExport = () => {
    // Simulate export functionality
    toast.success(`Exporting ${exportFormat.toUpperCase()} file with ${selectedMetrics.length} metrics for ${includePlatforms.length} platforms`);
    
    // In a real implementation, this would trigger the actual export
    if (exportFormat === 'csv') {
      // Generate CSV
      const csvData = generateCSV();
      downloadFile(csvData, 'social-media-report.csv', 'text/csv');
    } else if (exportFormat === 'pdf') {
      // Generate PDF
      toast.info("PDF generation in progress...");
    } else if (exportFormat === 'png') {
      // Generate PNG
      toast.info("Chart image generation in progress...");
    }
  };

  const generateCSV = () => {
    const headers = ['Date', 'Platform', ...selectedMetrics.map(m => metrics.find(metric => metric.id === m)?.label || m)];
    const data = [
      headers.join(','),
      // Sample data rows
      `2024-01-15,Twitter,${selectedMetrics.map(() => Math.floor(Math.random() * 10000)).join(',')}`,
      `2024-01-15,Instagram,${selectedMetrics.map(() => Math.floor(Math.random() * 10000)).join(',')}`,
      `2024-01-15,LinkedIn,${selectedMetrics.map(() => Math.floor(Math.random() * 10000)).join(',')}`
    ];
    return data.join('\n');
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Dashboard Data
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Export Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'csv', label: 'CSV', icon: FileSpreadsheet, description: 'Data file' },
                  { id: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Spreadsheet' },
                  { id: 'pdf', label: 'PDF', icon: FileText, description: 'Report' },
                  { id: 'png', label: 'PNG', icon: Image, description: 'Chart image' }
                ].map((format) => {
                  const Icon = format.icon;
                  return (
                    <Button
                      key={format.id}
                      variant={exportFormat === format.id ? 'default' : 'outline'}
                      className="h-auto p-3 flex flex-col gap-2"
                      onClick={() => setExportFormat(format.id as any)}
                    >
                      <Icon className="h-6 w-6" />
                      <div className="text-xs">
                        <div className="font-medium">{format.label}</div>
                        <div className="text-muted-foreground">{format.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Date Range */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Date Range</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 days</SelectItem>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="last90days">Last 90 days</SelectItem>
                  <SelectItem value="thismonth">This month</SelectItem>
                  <SelectItem value="lastmonth">Last month</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Metrics Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Metrics to Include</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {metrics.map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={metric.id}
                      checked={selectedMetrics.includes(metric.id)}
                      onCheckedChange={() => handleMetricToggle(metric.id)}
                    />
                    <label
                      htmlFor={metric.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {metric.label}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Platforms Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Platforms to Include</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={includePlatforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                    />
                    <label
                      htmlFor={platform.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {platform.label}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Export Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Export Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Format: <span className="font-medium text-foreground">{exportFormat.toUpperCase()}</span></p>
                <p>Metrics: <span className="font-medium text-foreground">{selectedMetrics.length} selected</span></p>
                <p>Platforms: <span className="font-medium text-foreground">{includePlatforms.length} selected</span></p>
                <p>Date Range: <span className="font-medium text-foreground">{dateRange.replace(/([A-Z])/g, ' $1').toLowerCase()}</span></p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button onClick={handleExport} disabled={selectedMetrics.length === 0 || includePlatforms.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}