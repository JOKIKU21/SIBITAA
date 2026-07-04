import { readFileSync, writeFileSync } from "fs";
import fg from "fast-glob";

const DRY_RUN = process.argv.includes("--dry-run");

const FILES = fg.sync(
  [
    "src/**/*.{ts,tsx,js,jsx,html,mdx}",
    "app/**/*.{ts,tsx,js,jsx,html,mdx}",
    "components/**/*.{ts,tsx,js,jsx}",
    "pages/**/*.{ts,tsx,js,jsx}",
  ],
  {
    ignore: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
    ],
  }
);

const spacingScale = {
  0: "0",
  1: "0.25",
  2: "0.5",
  3: "0.75",
  4: "1",
  5: "1.25",
  6: "1.5",
  7: "1.75",
  8: "2",
  9: "2.25",
  10: "2.5",
  11: "2.75",
  12: "3",
  14: "3.5",
  16: "4",
  18: "4.5",
  20: "5",
  22: "5.5",
  24: "6",
  26: "6.5",
  28: "7",
  30: "7.5",
  32: "8",
  34: "8.5",
  36: "9",
  40: "10",
  42: "10.5",
  44: "11",
  48: "12",
  54: "13.5",
  56: "14",
  64: "16",
  72: "18",
  80: "20",
  96: "24",
};

const utilities = [
  "p","px","py","pt","pb","pl","pr",
  "m","mx","my","mt","mb","ml","mr",
  "w","h","min-w","min-h","max-w","max-h",
  "top","right","bottom","left",
  "gap","gap-x","gap-y",
  "rounded","rounded-t","rounded-b","rounded-l","rounded-r",
  "text","leading","tracking",
  "space-x","space-y",
  "inset","inset-x","inset-y",
];

const colorMap = {
  "#F0F2F9": "canvas",
};

let changedFiles = 0;
let replacements = 0;

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

for (const file of FILES) {

  let source = readFileSync(file, "utf8");
  let output = source;

  // spacing
  for (const util of utilities) {

    const regex = new RegExp(
      `${escapeRegex(util)}-\\[(\\d+)px\\]`,
      "g"
    );

    output = output.replace(regex, (_, px) => {

      if (!(px in spacingScale))
        return _;

      replacements++;

      return `${util}-${spacingScale[px]}`;
    });
  }

  // colors
  for (const [hex, name] of Object.entries(colorMap)) {

    const escaped = escapeRegex(hex);

    output = output.replace(
      new RegExp(`bg-\\[${escaped}\\]`, "gi"),
      `bg-${name}`
    );

    output = output.replace(
      new RegExp(`text-\\[${escaped}\\]`, "gi"),
      `text-${name}`
    );

    output = output.replace(
      new RegExp(`border-\\[${escaped}\\]`, "gi"),
      `border-${name}`
    );
  }

  if (output !== source) {

    changedFiles++;

    console.log("✔", file);

    if (!DRY_RUN) {
      writeFileSync(file, output);
    }
  }
}

console.log("");
console.log("===========================");
console.log("Files :", changedFiles);
console.log("Fixes :", replacements);
console.log("Mode  :", DRY_RUN ? "DRY RUN" : "WRITE");