async function render(links) {
  //
  let storage = await chrome.storage.local.get(null);
  //
  storage.ad_blocker = storage.ad_blocker === false ? false : true;
  storage.greyscale = storage.greyscale === false ? false : true;
  storage.text_only = storage.text_only === false ? false : true;
  //
  let styles = document.querySelectorAll(`.royce-geyscale-style`);
  for (let style of styles) {
    style.remove();
  }
  //
  ["ad_blocker", "greyscale", "text_only"].forEach((name) => {
    if (storage[name] === true) {
      if (document.contains(links[name]) === true) {
        // do nothing
      } else {
        document.documentElement.prepend(links[name]);
      }
    } else {
      if (document.contains(links[name]) === true) {
        links[name].remove();
      } else {
        // do nothing
      }
    }
  });
  //
}

async function init() {
  //
  let links = {};
  ["ad_blocker", "greyscale", "text_only"].forEach((name) => {
    links[name] = document.createElement("link");
    links[name].rel = "stylesheet";
    links[name].href = chrome.runtime.getURL(`/css/${name}.css`);
  });
  //
  chrome.storage.onChanged.addListener(() => {
    render(links);
  });
  render(links);
}

init();
