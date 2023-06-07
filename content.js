async function render(links) {
  //
  let storage = await chrome.storage.local.get(null);
  //
  storage.remove_recommended_feed =
    storage.remove_recommended_feed === false ? false : true;
  storage.remove_video = storage.remove_video === false ? false : true;
  //
  let styles = document.querySelectorAll(`.royce-geyscale-style`);
  for (let style of styles) {
    style.remove();
  }
  //
  ["remove_recommended_feed", "remove_video"].forEach((name) => {
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
  ["remove_recommended_feed", "remove_video"].forEach((name) => {
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
