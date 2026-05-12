import reveal from "reveal.js";
import highlight from "reveal.js/plugin/highlight";
import markdown from "reveal.js/plugin/markdown";
import notes from "reveal.js/plugin/notes";

reveal.initialize({
  backgroundTransition: "none",
  disableLayout: true,
  hash: true,
  hashOneBasedIndex: true,
  plugins: [highlight, markdown, notes],
  progress: true,
  transition: "none",
});

export default reveal;
