"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const DEFAULT_MOCKUP_CANVAS_COLOR = "#0F172A";

interface UiPreferencesState {
  mockupCanvasColor: string;
  setMockupCanvasColor: (color: string) => void;
  resetMockupCanvasColor: () => void;
}

export const useUiPreferencesStore = create<UiPreferencesState>()(
  persist(
    (set) => ({
      mockupCanvasColor: DEFAULT_MOCKUP_CANVAS_COLOR,
      setMockupCanvasColor: (color) => set({ mockupCanvasColor: color }),
      resetMockupCanvasColor: () => set({ mockupCanvasColor: DEFAULT_MOCKUP_CANVAS_COLOR }),
    }),
    {
      name: "nera-ui-preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
