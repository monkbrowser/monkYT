function render(toggle, value) {
  if (value) {
    toggle.classList.add("active");
  } else {
    toggle.classList.remove("active");
  }
}
async function init() {
  let storage = await chrome.storage.local.get(null);
  //
  storage.remove_recommended_feed =
    storage.remove_recommended_feed === false ? false : true;
  storage.remove_video = storage.remove_video === false ? false : true;
  //
  let toggles = document.querySelectorAll(`[data-toggle-key]`);
  //
  for (let toggle of toggles) {
    let key = toggle.dataset.toggleKey;
    render(toggle, storage[key]);
    toggle.addEventListener("click", () => {
      storage[key] = !storage[key];
      chrome.storage.local.set(storage);
      render(toggle, storage[key]);
    });
  }
  //
}
//
init();
