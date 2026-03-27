import fs from "node:fs/promises";
import path from "node:path";
import { buildJs, buildScss, copyStaticFile } from "./build.js";

export const watch = async () => {
  const watcher = fs.watch("src", { persistent: true, recursive: true });
  for await (const event of watcher) {
    const file = event?.filename;
    if (file) {
      if (file.endsWith(".js")) {
        await buildJs();
      } else if (file.endsWith(".scss")) {
        await buildScss();
      } else {
        await copyStaticFile(path.join("src", file));
      }
    }
  }
};

if (import.meta.main) {
  watch();
}
