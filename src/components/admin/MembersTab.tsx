import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type SchoolType = Database["public"]["Enums"]["school_type"];
type YearType = Database["public"]["Enums"]["year_type"];

const MembersTab = () => {
  const [schoolFilter, setSchoolFilter] = useState<SchoolType | "all">("all");
  const [yearFilter, setYearFilter] = useState<YearType | "all">("all");

  const { data: members, isLoading } = useQuery({
    queryKey: ["members", schoolFilter, yearFilter],
    queryFn: async () => {
      let query = supabase.from("members").select("*").order("created_at", { ascending: false });

      if (schoolFilter !== "all") {
        query = query.eq("school", schoolFilter);
      }
      if (yearFilter !== "all") {
        query = query.eq("year_of_study", yearFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const exportToCSV = () => {
    if (!members || members.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Full Name", "Email", "Phone", "School", "Year", "Constituency", "Ward", "Gender"];
    const csvData = members.map(m => [
      m.full_name,
      m.email,
      m.phone_number,
      m.school,
      m.year_of_study,
      m.constituency,
      m.ward || "",
      m.gender || ""
    ]);

    const csv = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `emust-members-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    
    toast.success("Members exported successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Members</CardTitle>
        <CardDescription>View and manage all registered members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={schoolFilter} onValueChange={(value) => setSchoolFilter(value as SchoolType | "all")}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by school" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              <SelectItem value="SCI">SCI</SelectItem>
              <SelectItem value="SEAC">SEAC</SelectItem>
              <SelectItem value="SPA">SPA</SelectItem>
              <SelectItem value="SBE">SBE</SelectItem>
              <SelectItem value="Nursing">Nursing</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={(value) => setYearFilter(value as YearType | "all")}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="1">Year 1</SelectItem>
              <SelectItem value="2">Year 2</SelectItem>
              <SelectItem value="3">Year 3</SelectItem>
              <SelectItem value="4">Year 4</SelectItem>
              <SelectItem value="5">Year 5</SelectItem>
              <SelectItem value="6">Year 6</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={exportToCSV} variant="outline" className="ml-auto">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Constituency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.full_name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone_number}</TableCell>
                    <TableCell>{member.school}</TableCell>
                    <TableCell>Year {member.year_of_study}</TableCell>
                    <TableCell>{member.constituency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {!isLoading && members?.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No members found</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MembersTab;
