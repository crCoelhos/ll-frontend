import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../store/slices/search-slice";
import { RootState } from "../store";

export function LawyerSearchBox() {
  const [search, setSearch] = useState<string>("");

  console.log(search);

  const dispatch = useDispatch();
  const searchString = useSelector(
    (state: RootState) => state.search.searchString
  );

  const handleSearch = (searchString: string) => {
    dispatch(searchActions.setSearchString(searchString));
  };
  const handleTeste = () => {
    console.log("searchString from Redux:", searchString);
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
          handleSearch(search);
        }}
      >
        Pesquisar
      </Button>
      <Button
        onClick={() => {
          handleTeste();
        }}
      >
        testar
      </Button>
    </div>
  );
}
