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

export const copyStaticFile = async (input) => {
  const out = input.replace(/^src\//, "site/");
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.cp(input, out);
};

const copyStatic = async () => {
  const files = [];
  const dirs = ["src"];

  while (dirs.length) {
    const dir = dirs.pop();
    const contents = await fs.readdir(dir, { withFileTypes: true });

    for (const file of contents) {
      const p = path.join(dir, file.name);
      if (file.isDirectory()) {
        dirs.push(p);
      } else if (!/\.(js|scss|DS_Store)$/.test(p)) {
        files.push(p);
      }
    }
  }

  for await (const file of files) {
    await copyStaticFile(file);
  }
};

export const buildScss = async () => {
  const scssEntrypoints = await getScssEntrypoints();

  for await (const { input, output } of scssEntrypoints) {
    const { css } = await sass.compileAsync(input, {
      loadPaths: [
        "node_modules/reveal.js/css",
        "node_modules/highlight.js/scss",
      ],
    });
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, css);
  }
};

export const buildJs = async () => {
  await esbuild.build({
    bundle: true,
    entryPoints: ["src/assets/main.js"],
    outdir: "site/assets",
  });
};

export const build = async () => {
  await fs.rm("site/assets", { force: true, recursive: true });

  await copyStatic();
  await buildJs();
  await buildScss();
};

if (import.meta.main) {
  build();
}
