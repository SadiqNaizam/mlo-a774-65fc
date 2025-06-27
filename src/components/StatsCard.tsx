import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  percentageChange: number;
  description: string;
  metricIcon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  percentageChange,
  description,
  metricIcon
}) => {
  console.log(`StatsCard loaded for: ${title}`);

  const isPositive = percentageChange >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">
          {metricIcon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span
            className={cn(
              "flex items-center gap-1",
              isPositive ? "text-emerald-600" : "text-red-600"
            )}
          >
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            {Math.abs(percentageChange)}%
          </span>
          <span className="ml-1">{description}</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;