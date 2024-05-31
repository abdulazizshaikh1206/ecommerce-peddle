import React from "react";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

import { sortOrder } from "../types";

interface SortIndicatorInput {
  sortOrder?: sortOrder;
  changeSortOrder: (direction: sortOrder) => void;
}

const SortIndicator: React.FC<SortIndicatorInput> = ({
  sortOrder = "ASC",
  changeSortOrder,
}) => {
  return (
    <div
      onClick={() => changeSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
      className="cursor-pointer"
    >
      {sortOrder === "ASC" ? (
        <NorthIcon fontSize="small" className="ml-2 text-sm" />
      ) : (
        <SouthIcon fontSize="small" className="ml-2 text-sm" />
      )}
    </div>
  );
};

export default SortIndicator;
