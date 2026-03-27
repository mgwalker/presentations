import reveal from "reveal.js";
import highlight from "reveal.js/plugin/highlight";
import notes from "reveal.js/plugin/notes";

reveal.initialize({
  hash: true,
  hashOneBasedIndex: true,
  plugins: [highlight, notes],
  progress: true,
});

export default reveal;
