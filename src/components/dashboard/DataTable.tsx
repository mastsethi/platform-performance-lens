import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Download, Search, Filter } from "lucide-react";
import { format } from "date-fns";

const mockTableData = [
  {
    id: 1,
    date: new Date("2024-01-15"),
    platform: "Twitter",
    account: "@company",
    reach: 45000,
    views: 23000,
    engagement: 1200,
    clicks: 450,
    leads: 12,
    conversions: 3
  },
  {
    id: 2,
    date: new Date("2024-01-15"),
    platform: "Instagram",
    account: "@company_insta",
    reach: 67000,
    views: 45000,
    engagement: 2100,
    clicks: 780,
    leads: 24,
    conversions: 8
  },
  {
    id: 3,
    date: new Date("2024-01-14"),
    platform: "LinkedIn",
    account: "Company Page",
    reach: 23000,
    views: 12000,
    engagement: 890,
    clicks: 340,
    leads: 18,
    conversions: 5
  },
  {
    id: 4,
    date: new Date("2024-01-14"),
    platform: "YouTube",
    account: "Company Channel",
    reach: 89000,
    views: 67000,
    engagement: 3400,
    clicks: 1200,
    leads: 45,
    conversions: 12
  },
  {
    id: 5,
    date: new Date("2024-01-13"),
    platform: "Medium",
    account: "@company-blog",
    reach: 12000,
    views: 8900,
    engagement: 450,
    clicks: 230,
    leads: 8,
    conversions: 2
  }
];

const platformColors: { [key: string]: string } = {
  Twitter: "bg-twitter/10 text-twitter",
  Instagram: "bg-instagram/10 text-instagram",
  LinkedIn: "bg-linkedin/10 text-linkedin",
  YouTube: "bg-youtube/10 text-youtube",
  Medium: "bg-medium/10 text-foreground",
  Reddit: "bg-reddit/10 text-reddit",
  Website: "bg-website/10 text-website"
};

interface DataTableProps {
  selectedPlatforms: string[];
  dateRange: { from: Date; to: Date };
}

export function DataTable({ selectedPlatforms, dateRange }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockTableData.filter(row => {
    const matchesPlatform = selectedPlatforms.length === 0 || 
      selectedPlatforms.some(platform => row.platform.toLowerCase() === platform);
    const matchesSearch = searchTerm === "" || 
      row.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.account.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = row.date >= dateRange.from && row.date <= dateRange.to;
    
    return matchesPlatform && matchesSearch && matchesDate;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Data Table</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search platforms or accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Reach</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Engagement</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {format(row.date, "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={platformColors[row.platform] || ""}
                    >
                      {row.platform}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.account}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatNumber(row.reach)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(row.views)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(row.engagement)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(row.clicks)}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.leads}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {row.conversions}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No data found for the selected criteria.
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div>
            Showing {filteredData.length} of {mockTableData.length} entries
          </div>
          <div>
            Filtered by: {selectedPlatforms.length} platforms, {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}