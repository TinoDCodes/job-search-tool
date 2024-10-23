"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { CustomButton } from "./custom/CustomButton";
import {
  BookmarkIcon,
  BookOpenIcon,
  ClockIcon,
} from "@heroicons/react/16/solid";

const SearchHistory = () => {
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

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
      <DropdownMenu aria-label="Search Histroy" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SearchHistory;
