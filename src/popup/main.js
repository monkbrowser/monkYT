//
const CONFIG = {
  toggles: {
    // css_file_name: [ title, default_value ]
    hide_video: ["Hide Video", true],
    hide_notification_bell: ["Hide Notification Bell", true],
    hide_feed: ["Hide Recommended Feed", true],
    hide_comments: ["Hide Comments", true],
    hide_merch: ["Hide Merch", true],
    hide_shorts: ["Hide Shorts", true],
    hide_sidebar: ["Hide Sidebar", true],
    hide_related: ["Hide Related Videos", true],
    hide_live_chat: ["Hide Live Chat", true],
    hide_playlist: ["Hide Playlist", true],
    // hide_subs: ["Hide Subscriptions", true],
  },
};
//
function render(toggle, value) {
  if (value) {
    toggle.classList.add("active");
  } else {
    toggle.classList.remove("active");
  }
}
async function init() {
  let storage = await chrome.storage.local.get(null);
  // init_storage
  for (let key in CONFIG.toggles) {
    if (storage[key] === true || storage[key] === false) {
      // do nothing
    } else {
      storage[key] = CONFIG.toggles[key][1];
    }
  }
  //
  let html = "";
  for (let key in CONFIG.toggles) {
    html += `
      <div class="section section_link ${
        storage[key] ? "active" : ""
      }" data-toggle-key="${key}">
        <div class="section_link_text">${CONFIG.toggles[key][0]}</div>
        <div class="chrome_toggle">
          <div class="chrome_toggle-bar"></div>
          <div class="chrome_toggle-knob"></div>
        </div>
      </div>
    `;
  }
  //
  document.querySelector(".page.main.active").innerHTML = html;
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
