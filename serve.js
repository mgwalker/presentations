import { createServer } from "http-server";
import { build } from "./build.js";
import { watch } from "./watch.js";

const serve = async () => {
  await build();
  createServer({ root: "site" }).listen(8080);
  watch();
};

if (import.meta.main) {
  serve();
}
