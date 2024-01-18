import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../store/slices/search-slice";
import { RootState, useAppSelector } from "../store";
import axios from "axios";
import { lawyerSearchResponse } from "../types/lawyerSearchResponse.interface";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function LawyerSearchBox() {
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResponse, setSearchResponse] = useState<lawyerSearchResponse[]>(
    []
  );

  console.log(search);

  const dispatch = useDispatch();

  const handleSearch = (searchString: string) => {
    dispatch(searchActions.setSearchString(searchString));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    if (inputValue === "") {
      dispatch(searchActions.setSearchString(null));
    }
  };

  return (
    <div className="flex justify-center">
      <Input
        type="search"
        placeholder="Pesquisar..."
        className="lg:w-[800px]"
        value={search}
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <Button
        onClick={() => {
          handleSearch(search);
          setIsLoading(true);
        }}
        className="hover:bg-gray-700 ml-2"
      >
        <MagnifyingGlassIcon />
      </Button>
    </div>
  );
}
