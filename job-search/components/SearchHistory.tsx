"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { CustomButton } from "./custom/CustomButton";
import { ClockIcon, MapPinIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useSearchHistoryStore } from "@/store/searchHistoryStore";
import { SearchHistoryRecord } from "@/utils/types";

const SearchHistoryItem = ({ record }: { record: SearchHistoryRecord }) => {
  return (
    <div className="flex flex-col gap-1 py-1 px-2">
      <p className="text-sm line-clamp-1 font-medium">{record.keywords}</p>
      <div className="flex items-center gap-1">
        <MapPinIcon className="h-3 w-3" />
        <small className="text-xs">{record.location || "default"}</small>
      </div>
    </div>
  );
};

const SearchHistory = () => {
  const history = useSearchHistoryStore((state) => state.history);

  return (
    <Dropdown backdrop="opaque" className="bg-white dark:bg-[#141422ec]">
      <DropdownTrigger>
        <CustomButton
          color="teal-shadow"
          className="rounded-full flex items-center"
          size="history"
        >
          <ClockIcon className="h-5 w-5" />
          <span className="hidden lg:block">Search History</span>
        </CustomButton>
      </DropdownTrigger>
      <DropdownMenu aria-label="Search Histroy">
        <DropdownSection className="max-h-[60vh] overflow-y-auto border-b border-zinc-100 dark:border-zinc-800">
          {history.map((record) => (
            <DropdownItem
              key={record.key}
              href={`/search?keywords=${record.keywords}${
                record.location && `&location=${record.location}`
              }`}
              className="dark:hover:bg-teal-500/30"
              textValue={`${record.keywords} - ${record.location}`}
            >
              <SearchHistoryItem record={record} />
            </DropdownItem>
          ))}
        </DropdownSection>

        <DropdownItem
          key="delete"
          className="text-danger py-3"
          color="danger"
          startContent={
            <TrashIcon className="h-5 w-5 fill-danger group-hover:fill-white transition" />
          }
        >
          Clear History
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SearchHistory;
