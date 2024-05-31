import { Button } from "@mui/material";
import React, { useState } from "react";

interface SearchBarInput {
  search: (key: string) => void;
}

const SearchBar: React.FC<SearchBarInput> = ({ search }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="my-4">
      <div className="flex mt-4">
        <input
          type="text"
          className="border border-slate-300 h-12 font-lg px-2 w-full mr-2"
          placeholder="Search product by name or brand name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="outlined"
          color="info"
          className="w-32"
          onClick={() => search(searchText)}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
