import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Filter, Save, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Field definitions by entity
const FIELD_DEFINITIONS: Record<string, Record<string, { label: string; type: string; options?: string[] }>> = {
  contacts: {
    firstName: { label: "First Name", type: "text" },
    lastName: { label: "Last Name", type: "text" },
    email: { label: "Email", type: "text" },
    phone: { label: "Phone", type: "text" },
    jobTitle: { label: "Job Title", type: "text" },
    department: { label: "Department", type: "text" },
    jobLevel: { label: "Job Level", type: "select", options: ["IC", "Manager", "Director", "VP", "C-Level"] },
    leadSource: { label: "Lead Source", type: "text" },
    engagementScore: { label: "Engagement Score", type: "number" },
    lastEngagementAt: { label: "Last Engagement", type: "date" },
    status: { label: "Status", type: "select", options: ["lead", "qualified", "customer", "churned"] },
    tags: { label: "Tags", type: "text" },
    createdAt: { label: "Created Date", type: "date" },
  },
  accounts: {
    companyName: { label: "Company Name", type: "text" },
    domain: { label: "Domain", type: "text" },
    industry: { label: "Industry", type: "text" },
    companySize: { label: "Company Size", type: "text" },
    location: { label: "Location", type: "text" },
    country: { label: "Country", type: "text" },
    revenueBand: { label: "Revenue Band", type: "text" },
    engagementScore: { label: "Engagement Score", type: "number" },
    accountTier: { label: "Account Tier", type: "select", options: ["tier1", "tier2", "tier3"] },
    createdAt: { label: "Created Date", type: "date" },
  },
  deals: {
    fullName: { label: "Full Name", type: "text" },
    email: { label: "Email", type: "text" },
    company: { label: "Company", type: "text" },
    phone: { label: "Phone", type: "text" },
    jobTitle: { label: "Job Title", type: "text" },
    dealValue: { label: "Deal Value", type: "number" },
    probability: { label: "Probability %", type: "number" },
    source: { label: "Source", type: "text" },
    engagementScore: { label: "Engagement Score", type: "number" },
    lastEngagementAt: { label: "Last Engagement", type: "date" },
    createdAt: { label: "Created Date", type: "date" },
    closedAt: { label: "Closed Date", type: "date" },
  },
};

// Operators by field type
const OPERATORS: Record<string, { value: string; label: string }[]> = {
  text: [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Does not equal" },
    { value: "contains", label: "Contains" },
    { value: "not_contains", label: "Does not contain" },
    { value: "starts_with", label: "Starts with" },
    { value: "ends_with", label: "Ends with" },
    { value: "is_blank", label: "Is blank" },
    { value: "is_not_blank", label: "Is not blank" },
  ],
  number: [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Does not equal" },
    { value: "greater_than", label: "Greater than" },
    { value: "greater_or_equal", label: "Greater or equal" },
    { value: "less_than", label: "Less than" },
    { value: "less_or_equal", label: "Less or equal" },
    { value: "between", label: "Between" },
    { value: "is_blank", label: "Is blank" },
    { value: "is_not_blank", label: "Is not blank" },
  ],
  date: [
    { value: "equals", label: "On date" },
    { value: "before", label: "Before" },
    { value: "after", label: "After" },
    { value: "date_between", label: "Between" },
    { value: "last_x_days", label: "Last X days" },
    { value: "last_x_weeks", label: "Last X weeks" },
    { value: "last_x_months", label: "Last X months" },
    { value: "is_blank", label: "Is blank" },
    { value: "is_not_blank", label: "Is not blank" },
  ],
  select: [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Does not equal" },
    { value: "in", label: "In list" },
    { value: "not_in", label: "Not in list" },
  ],
};

interface FilterCondition {
  field: string;
  operator: string;
  value: any;
  caseSensitive?: boolean;
}

interface FilterGroup {
  logic: "AND" | "OR";
  conditions: FilterCondition[];
  groups?: FilterGroup[];
}

interface FilterDefinition {
  logic: "AND" | "OR";
  conditions: FilterCondition[];
  groups?: FilterGroup[];
}

interface FilterBuilderProps {
  entity: string;
  onApply: (definition: FilterDefinition) => void;
  initialDefinition?: FilterDefinition;
}

function ConditionRow({
  condition,
  entity,
  onChange,
  onRemove,
}: {
  condition: FilterCondition;
  entity: string;
  onChange: (updated: FilterCondition) => void;
  onRemove: () => void;
}) {
  const fields = FIELD_DEFINITIONS[entity] || {};
  const fieldType = fields[condition.field]?.type || "text";
  const operators = OPERATORS[fieldType] || OPERATORS.text;
  const needsValue = !["is_blank", "is_not_blank"].includes(condition.operator);
  const needsTwoValues = ["between", "date_between"].includes(condition.operator);

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md" data-testid="filter-condition-row">
      <Select value={condition.field} onValueChange={(field) => onChange({ ...condition, field })}>
        <SelectTrigger className="w-[200px]" data-testid="select-field">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(fields).map(([key, def]) => (
            <SelectItem key={key} value={key}>
              {def.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={condition.operator} onValueChange={(operator) => onChange({ ...condition, operator })}>
        <SelectTrigger className="w-[180px]" data-testid="select-operator">
          <SelectValue placeholder="Select operator" />
        </SelectTrigger>
        <SelectContent>
          {operators.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {needsValue && !needsTwoValues && (
        <Input
          type={fieldType === "number" ? "number" : fieldType === "date" ? "date" : "text"}
          value={condition.value || ""}
          onChange={(e) => onChange({ ...condition, value: e.target.value })}
          placeholder="Value"
          className="flex-1"
          data-testid="input-value"
        />
      )}

      {needsTwoValues && (
        <>
          <Input
            type={fieldType === "number" || condition.operator.includes("between") ? "number" : "date"}
            value={condition.value?.[0] || ""}
            onChange={(e) => onChange({ ...condition, value: [e.target.value, condition.value?.[1] || ""] })}
            placeholder="From"
            className="flex-1"
            data-testid="input-from-value"
          />
          <Input
            type={fieldType === "number" || condition.operator.includes("between") ? "number" : "date"}
            value={condition.value?.[1] || ""}
            onChange={(e) => onChange({ ...condition, value: [condition.value?.[0] || "", e.target.value] })}
            placeholder="To"
            className="flex-1"
            data-testid="input-to-value"
          />
        </>
      )}

      <Button variant="ghost" size="icon" onClick={onRemove} data-testid="button-remove-condition">
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}

function GroupBuilder({
  group,
  entity,
  onChange,
  onRemove,
  depth = 0,
}: {
  group: FilterGroup;
  entity: string;
  onChange: (updated: FilterGroup) => void;
  onRemove?: () => void;
  depth?: number;
}) {
  const addCondition = () => {
    onChange({
      ...group,
      conditions: [...group.conditions, { field: "", operator: "equals", value: "" }],
    });
  };

  const updateCondition = (index: number, updated: FilterCondition) => {
    const newConditions = [...group.conditions];
    newConditions[index] = updated;
    onChange({ ...group, conditions: newConditions });
  };

  const removeCondition = (index: number) => {
    onChange({
      ...group,
      conditions: group.conditions.filter((_, i) => i !== index),
    });
  };

  const addNestedGroup = () => {
    const newGroups = group.groups || [];
    onChange({
      ...group,
      groups: [...newGroups, { logic: "AND", conditions: [] }],
    });
  };

  const updateNestedGroup = (index: number, updated: FilterGroup) => {
    const newGroups = [...(group.groups || [])];
    newGroups[index] = updated;
    onChange({ ...group, groups: newGroups });
  };

  const removeNestedGroup = (index: number) => {
    onChange({
      ...group,
      groups: (group.groups || []).filter((_, i) => i !== index),
    });
  };

  return (
    <Card className={`p-4 ${depth > 0 ? "ml-6 border-l-4 border-blue-500" : ""}`} data-testid="filter-group">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label>Match</Label>
            <Select value={group.logic} onValueChange={(logic: "AND" | "OR") => onChange({ ...group, logic })}>
              <SelectTrigger className="w-[120px]" data-testid="select-group-logic">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">All (AND)</SelectItem>
                <SelectItem value="OR">Any (OR)</SelectItem>
              </SelectContent>
            </Select>
            <Label>of the following:</Label>
          </div>
          {depth > 0 && onRemove && (
            <Button variant="ghost" size="sm" onClick={onRemove} data-testid="button-remove-group">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {group.conditions.map((condition, index) => (
          <ConditionRow
            key={index}
            condition={condition}
            entity={entity}
            onChange={(updated) => updateCondition(index, updated)}
            onRemove={() => removeCondition(index)}
          />
        ))}

        {group.groups?.map((nestedGroup, index) => (
          <GroupBuilder
            key={index}
            group={nestedGroup}
            entity={entity}
            onChange={(updated) => updateNestedGroup(index, updated)}
            onRemove={() => removeNestedGroup(index)}
            depth={depth + 1}
          />
        ))}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addCondition} data-testid="button-add-condition">
            <Plus className="h-4 w-4 mr-1" />
            Add Condition
          </Button>
          {depth < 2 && (
            <Button variant="outline" size="sm" onClick={addNestedGroup} data-testid="button-add-group">
              <Plus className="h-4 w-4 mr-1" />
              Add Group
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export function FilterBuilder({ entity, onApply, initialDefinition }: FilterBuilderProps) {
  const { toast } = useToast();
  const [definition, setDefinition] = useState<FilterDefinition>(
    initialDefinition || {
      logic: "AND",
      conditions: [],
      groups: [],
    }
  );
  const [resultCount, setResultCount] = useState<number | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterVisibility, setFilterVisibility] = useState<"private" | "team" | "org">("private");

  // Fetch saved filters
  const { data: savedFilters } = useQuery<any[]>({
    queryKey: ["/api/filter/views", { entity }],
  });

  // Get count preview
  const countMutation = useMutation({
    mutationFn: async (def: FilterDefinition) => {
      const response = await apiRequest("POST", "/api/filter/count", { entity, definition: def });
      return response as unknown as { count: number };
    },
    onSuccess: (data: { count: number }) => {
      setResultCount(data.count);
    },
  });

  // Save filter
  const saveMutation = useMutation({
    mutationFn: async (data: { name: string; visibility: string; definition: FilterDefinition }) => {
      return apiRequest("POST", "/api/filter/views", {
        name: data.name,
        entity,
        definition: data.definition,
        visibility: data.visibility,
      });
    },
    onSuccess: () => {
      toast({ title: "Filter saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/filter/views"] });
      setSaveDialogOpen(false);
      setFilterName("");
    },
  });

  // Update count when definition changes
  useEffect(() => {
    if (definition.conditions.length > 0 || definition.groups?.length) {
      countMutation.mutate(definition);
    } else {
      setResultCount(null);
    }
  }, [definition]);

  const handleApply = () => {
    onApply(definition);
  };

  const handleSave = () => {
    if (!filterName.trim()) {
      toast({ title: "Please enter a filter name", variant: "destructive" });
      return;
    }
    saveMutation.mutate({ name: filterName, visibility: filterVisibility, definition });
  };

  const handleLoad = (filter: any) => {
    setDefinition(filter.definition);
    setLoadDialogOpen(false);
    toast({ title: `Loaded filter: ${filter.name}` });
  };

  return (
    <div className="space-y-4" data-testid="filter-builder">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Advanced Filter</h3>
          {resultCount !== null && (
            <span className="text-sm text-muted-foreground">({resultCount} results)</span>
          )}
        </div>
        <div className="flex gap-2">
          <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" data-testid="button-load-filter">
                <FolderOpen className="h-4 w-4 mr-1" />
                Load
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Load Saved Filter</DialogTitle>
                <DialogDescription>Select a saved filter to load</DialogDescription>
              </DialogHeader>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {savedFilters?.map((filter) => (
                  <Card
                    key={filter.id}
                    className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => handleLoad(filter)}
                    data-testid={`saved-filter-${filter.id}`}
                  >
                    <div className="font-medium">{filter.name}</div>
                    <div className="text-sm text-muted-foreground">{filter.visibility}</div>
                  </Card>
                ))}
                {(!savedFilters || savedFilters.length === 0) && (
                  <div className="text-center text-muted-foreground py-8">No saved filters</div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" data-testid="button-save-filter">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Filter</DialogTitle>
                <DialogDescription>Save this filter for future use</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Filter Name</Label>
                  <Input
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    placeholder="My custom filter"
                    data-testid="input-filter-name"
                  />
                </div>
                <div>
                  <Label>Visibility</Label>
                  <RadioGroup value={filterVisibility} onValueChange={(v: any) => setFilterVisibility(v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private">Private (only me)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="team" id="team" />
                      <Label htmlFor="team">Team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="org" id="org" />
                      <Label htmlFor="org">Organization</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSave} disabled={saveMutation.isPending} data-testid="button-confirm-save">
                  Save Filter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button onClick={handleApply} data-testid="button-apply-filter">
            <Filter className="h-4 w-4 mr-1" />
            Apply Filter
          </Button>
        </div>
      </div>

      <GroupBuilder group={definition} entity={entity} onChange={setDefinition} />
    </div>
  );
}
