import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const platforms = [
  { value: "twitter", label: "Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "medium", label: "Medium" },
  { value: "reddit", label: "Reddit" },
  { value: "website", label: "Website Blog" },
];

interface DataEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DataEntryDialog({ open, onOpenChange }: DataEntryDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    platform: "",
    account: "",
    date: new Date(),
    reach: "",
    views: "",
    engagement: "",
    clicks: "",
    leads: "",
    conversions: ""
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend/Google Sheets
    console.log("Submitting data:", formData);
    
    toast({
      title: "Data saved successfully!",
      description: `Added new metrics for ${formData.platform} on ${format(formData.date, "MMM dd, yyyy")}`,
    });

    // Reset form
    setFormData({
      platform: "",
      account: "",
      date: new Date(),
      reach: "",
      views: "",
      engagement: "",
      clicks: "",
      leads: "",
      conversions: ""
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Save className="h-4 w-4 text-primary-foreground" />
            </div>
            Add New Data Entry
          </DialogTitle>
          <DialogDescription>
            Manually enter performance metrics for your social media accounts.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Platform Selection */}
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select 
                value={formData.platform} 
                onValueChange={(value) => handleInputChange("platform", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal w-full",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "MMM dd, yyyy") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      if (date) {
                        handleInputChange("date", date);
                        setIsCalendarOpen(false);
                      }
                    }}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Account Name */}
          <div className="space-y-2">
            <Label htmlFor="account">Account Name/Handle</Label>
            <Input
              id="account"
              placeholder="e.g., @company_handle"
              value={formData.account}
              onChange={(e) => handleInputChange("account", e.target.value)}
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reach">Reach</Label>
              <Input
                id="reach"
                type="number"
                placeholder="0"
                value={formData.reach}
                onChange={(e) => handleInputChange("reach", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="views">Views</Label>
              <Input
                id="views"
                type="number"
                placeholder="0"
                value={formData.views}
                onChange={(e) => handleInputChange("views", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="engagement">Engagement</Label>
              <Input
                id="engagement"
                type="number"
                placeholder="0"
                value={formData.engagement}
                onChange={(e) => handleInputChange("engagement", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clicks">Clicks</Label>
              <Input
                id="clicks"
                type="number"
                placeholder="0"
                value={formData.clicks}
                onChange={(e) => handleInputChange("clicks", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leads">Leads</Label>
              <Input
                id="leads"
                type="number"
                placeholder="0"
                value={formData.leads}
                onChange={(e) => handleInputChange("leads", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="conversions">Conversions</Label>
              <Input
                id="conversions"
                type="number"
                placeholder="0"
                value={formData.conversions}
                onChange={(e) => handleInputChange("conversions", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-primary hover:shadow-glow"
              disabled={!formData.platform || !formData.account}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Data
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}