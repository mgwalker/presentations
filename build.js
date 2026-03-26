import esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import * as sass from "sass";

const exists = async (filePath) =>
  fs
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

const getScssEntrypoints = async () => {
  const scssEntrypoints = await fs
    .readdir("./src", { withFileTypes: true })
    .then((dirs) =>
      dirs.filter((dir) => dir.isDirectory() && dir.name !== "assets"),
    )
    .then((dirs) => dirs.map((dir) => path.join(dir.parentPath, dir.name)))
    .then(async (presentationDirs) =>
      Promise.all(
        presentationDirs.map(async (dir) => {
          const scss = path.join(dir, "main.scss");
          if (await exists(scss)) {
            return {
              input: scss,
              output: path.join("site", "assets", `${path.basename(dir)}.css`),
            };
          }
          return false;
        }),
      ).then((list) => list.filter((item) => item)),
    );

  return [
    { input: "src/assets/main.scss", output: "site/assets/main.css" },
    ...scssEntrypoints,
  ];
};

const main = async () => {
  await fs.cp("src", "site", { recursive: true });
  await fs.rm("site/assets", { force: true, recursive: true });

  await esbuild.build({
    bundle: true,
    entryPoints: ["src/assets/main.js"],
    outdir: "site/assets",
  });

  const scssEntrypoints = await getScssEntrypoints();

  for await (const { input, output } of scssEntrypoints) {
    try {
      const { css } = await sass.compileAsync(input, {
        loadPaths: [
          "node_modules/reveal.js/css",
          "node_modules/highlight.js/scss",
        ],
      });
      await fs.mkdir(path.dirname(output), { recursive: true });
      await fs.writeFile(output, css);
      console.log(output);
    } catch (e) {
      console.log(e);
    }
  }
};

if (import.meta.main) {
  main();
}
