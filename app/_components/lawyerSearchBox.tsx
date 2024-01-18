import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchActions } from "../store/slices/search-slice";

export function LawyerSearchBox() {
  const [search, setSearch] = useState<string>("");

  console.log(search);

  const dispatch = useDispatch();

  const handleSearch = (searchString: string, searchFilter: string) => {
    dispatch(searchActions.setSearchString(search));
  };

  return (
    <div className="flex justify-center">
      <Input
        type="search"
        placeholder="Pesquisar..."
        className="lg:w-[800px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        onClick={() => {
          handleSearch(search, "");
        }}
      >
        Pesquisar
      </Button>
    </div>
  );
}
