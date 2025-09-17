// Utilities for generating Bever customer codes
// Format: [CITYCODE]-[WARD]-[CATEGORY]-[ID]
// Example: JAL-02-OF-0102

const CATEGORY_MAP: Record<string, string> = {
  offices: "OF",
  stores: "PR", // Provision store
  individuals: "HM", // Home
};

export function padId(n: number, width = 4): string {
  return String(n).padStart(width, "0");
}

export function wardToTwoDigits(wardCode?: string): string {
  // Expect wardCode like JLG-W09; extract 09
  if (!wardCode) return "00";
  const m = wardCode.match(/W(\d{2})$/);
  return m ? m[1] : "00";
}

export function generateBeverCode(opts: {
  cityCode?: string; // default JAL for Jalingo
  wardCode?: string;
  category: "offices" | "stores" | "individuals";
  numericId?: number; // if not provided, derive from timestamp
}): string {
  const city = opts.cityCode ?? "JAL";
  const ward = wardToTwoDigits(opts.wardCode);
  const cat = CATEGORY_MAP[opts.category] ?? "XX";
  const id = padId(
    typeof opts.numericId === "number"
      ? opts.numericId
      : Math.floor(Date.now() % 10000)
  );
  return `${city}-${ward}-${cat}-${id}`;
}
