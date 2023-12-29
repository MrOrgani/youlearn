import { getAnalytics } from "@/lib/utils/getAnalytics";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { DataCard } from "./_components/DataCard";

const Analytics = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const { nbOfSales, totalRevenue } = await getAnalytics({ userId });
  return (
    <div className="p-6">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DataCard title="Revenues" value={totalRevenue} shouldFormat={true} />
        <DataCard
          title="Number of sales"
          value={nbOfSales}
          shouldFormat={false}
        />
      </div>
    </div>
  );
};

export default Analytics;
