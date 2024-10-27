"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { CustomButton } from "./custom/CustomButton";
import { BookmarkIcon, ClockIcon } from "@heroicons/react/16/solid";
import { useSearchHistoryStore } from "@/store/searchHistoryStore";

const SearchHistory = () => {
  const history = useSearchHistoryStore((state) => state.history);

  return (
    <Dropdown className="bg-[#eeeeee] dark:bg-[#141429]">
      <DropdownTrigger>
        <CustomButton
          color="teal-shadow"
          className="rounded-full flex items-center"
        >
          <ClockIcon className="h-5 w-5" />
          History
        </CustomButton>
      </DropdownTrigger>
      <DropdownMenu aria-label="Search Histroy" items={history}>
        {(record) => (
          <DropdownItem key={record.key}>
            <div className="flex items-center gap-2">
              <BookmarkIcon className="h-5 w-5" />
              <span className="text-sm">{record.keywords}</span>
            </div>

            {record.location && <p className="text-sm">{record.location}</p>}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SearchHistory;
