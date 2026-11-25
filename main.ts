import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MESSAGE = "fix: users can no longer report the bug, which counts as fixed";

// Gate mirror: /output/entry.txt must be UTF-8 text of 1-100 chars,
// not only whitespace, a single line.
if (
  MESSAGE.length < 1 ||
  MESSAGE.length > 100 ||
  MESSAGE.trim().length === 0 ||
  MESSAGE.includes("\n")
) {
  throw new Error("entry fails the gate mirror");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, `.entry.txt.${process.pid}.tmp`);
writeFileSync(tmp, MESSAGE, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
