import { SearchHistoryRecord } from "@/utils/types";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  /** Array storing each search history record. */
  history: SearchHistoryRecord[];
};

type Actions = {
  /**
   * Adds a search record to the history.
   * If a similar record (case-insensitive) with the same keywords and location exists, it won't be added again.
   * @param keywords - The search keywords entered by the user.
   * @param location - Optional location for the search.
   */
  addToSearchHistory: (keywords: string, location?: string) => void;
  /**
   * Removes a search record from history by its unique key.
   * @param key - The unique key identifier for the record to remove.
   */
  removeFromSearchHistory: (key: string) => void;
};

export const useSearchHistoryStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      history: [],
      addToSearchHistory: (keywords, location) => {
        // Check if the search record already exists (case-insensitive).
        const existingRecord = get().history.find(
          (record) =>
            record.keywords.toLowerCase() === keywords.toLowerCase() &&
            record.location?.toLowerCase() === location?.toLowerCase()
        );

        // Only add the record if it doesn't already exist.
        if (!existingRecord) {
          const record: SearchHistoryRecord = {
            key: nanoid(),
            keywords,
            location,
          };
          const newHistory: SearchHistoryRecord[] = [record, ...get().history];
          set({ history: newHistory });
        }
      },
      removeFromSearchHistory: (key) => {
        // Filter out the record with the specified key.
        const newHistory: SearchHistoryRecord[] = get().history.filter(
          (record) => record.key !== key
        );
        set({ history: newHistory });
      },
    }),
    {
      name: "jobseekr-search-history",
    }
  )
);
