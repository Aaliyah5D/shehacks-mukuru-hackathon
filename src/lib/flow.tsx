import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// In-progress transfer draft shared across the send-flow screens.
export type Draft = {
  fromCode: string;
  toCode: string;
  amount: string;
  sender: { name: string; city: string };
  recipient: { name: string; phone: string; city: string };
};

// Demo persona pre-fill (editable, not core logic).
const initial: Draft = {
  fromCode: "ZA",
  toCode: "ZW",
  amount: "1000",
  sender: { name: "Thandi", city: "Johannesburg" },
  recipient: { name: "Mai Chipo", phone: "+263 77 123 4567", city: "Harare" },
};

const STORAGE_KEY = "senda-draft";

const Ctx = createContext<{ draft: Draft; update: (p: Partial<Draft>) => void; reset: () => void }>(
  null as never,
);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Draft>(initial);
  const [restored, setRestored] = useState(false);

  // Keep the draft in sessionStorage so a reload or dropped connection
  // mid-flow doesn't throw away what was typed. Restored after mount because
  // storage isn't available during SSR.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setDraft({ ...initial, ...JSON.parse(saved) });
    } catch {
      // Storage blocked or corrupt: start from the pre-fill.
    }
    setRestored(true);
  }, []);
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Storage blocked: the flow still works, it just won't survive a reload.
    }
  }, [draft, restored]);

  return (
    <Ctx.Provider
      value={{
        draft,
        update: (p) => setDraft((d) => ({ ...d, ...p })),
        reset: () => setDraft(initial),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export const useFlow = () => useContext(Ctx);
