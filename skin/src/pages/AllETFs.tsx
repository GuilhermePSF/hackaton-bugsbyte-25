
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ETFCard } from "@/components/etf/ETFCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, LayoutGrid, List, SortAsc, SortDesc } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { ETF } from "@/types/etf";
import {getETFs} from "@/lib/api";

export function AllETFs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"name" | "growth">("growth");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  /* let etfs: ETF[] = [];
  getETFs().then((data) => {
    etfs = data;
  });  */
  const etfs: ETF [] = [
    {
      id: "1",
      name: "Global Tech ETF",
      short_name: "GTE",
      growth: 12.5,
    },
    {
      id: "2",
      name: "Sustainable Energy ETF",
      short_name: "SEE",
      growth: 8.3,
    },
    {
      id: "3",
      name: "Healthcare Leaders ETF",
      short_name: "HLE",
      growth: 15.2,
    },
    {
      id: "4",
      name: "Real Estate ETF",
      short_name: "REE",
      growth: 6.8,
    },
    {
      id: "5",
      name: "Emerging Markets ETF",
      short_name: "EME",
      growth: 10.1,
    },
  ];

  const filteredETFs = etfs.filter((etf) => {
    return etf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etf.short_name.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === "growth") {
      return sortOrder === "asc" ? a.growth - b.growth : b.growth - a.growth;
    }
    return 0;
  });



  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Explore ETFs</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search ETFs by name or symbol"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <Toggle 
                pressed={viewMode === "grid"} 
                onPressedChange={() => setViewMode("grid")}
                className="rounded-none border-0"
              >
                <LayoutGrid className="h-4 w-4" />
              </Toggle>
              <Toggle 
                pressed={viewMode === "list"} 
                onPressedChange={() => setViewMode("list")}
                className="rounded-none border-0"
              >
                <List className="h-4 w-4" />
              </Toggle>
            </div>
            
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as "name" | "growth")}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="change">Performance</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredETFs.map((etf) => (
              <ETFCard key={etf.id} etf={etf} showDetails={true} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredETFs.map((etf) => (
              <ETFCard key={etf.id} etf={etf} showDetails={true} listView={true} />
            ))}
          </div>
        )}
        
        {filteredETFs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No ETFs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
