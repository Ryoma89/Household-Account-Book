import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
      <div className="mt-10 space-y-4">
        <Skeleton className="w-full h-[30px] rounded-full" />
      </div>
  );
};

export default Loading;
