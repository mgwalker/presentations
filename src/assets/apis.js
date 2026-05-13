import highlight from "highlight.js";

const obs = fetch(
  "https://api.weather.gov/stations/KPIA/observations?limit=1",
).then((r) => r.json());

const need = new Set(["data-temperature", "data-temperature-raw"]);

const observer = new MutationObserver((list, observer) => {
  const currentTemp = document.querySelector("[data-temperature]");
  const tempRaw = document.querySelector("[data-temperature-raw]");

  if (currentTemp) {
    need.delete("data-temperature");
    obs.then((data) => {
      const temp = Math.round(
        (data.features[0].properties.temperature.value * 9) / 5 + 32,
      );

      currentTemp.innerText = `(it's currently ${temp}℉ in Goofy Ridge; this slide is using an API)`;
    });
  }
  if (tempRaw) {
    need.delete("data-temperature-raw");
    obs.then((data) => {
      delete data["@context"];
      const h = highlight.highlight(JSON.stringify(data, null, 2), {
        language: "json",
      });
      tempRaw.innerHTML = h.value;
    });
  }

  if (need.size === 0) {
    observer.disconnect();
  }
});

observer.observe(document.querySelector(".reveal .slides"), {
  childList: true,
  subtree: true,
});
