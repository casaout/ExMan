const { ipcRenderer } = require("electron");

console.log("in preload");

ipcRenderer.on("id", (e, id) => {
  console.log("id", id);
  window.serviceId = id;
});

function getToken() {
  var security_objects = JSON.parse(localStorage.getItem("localConfig_v2"))[
    "teams"
  ];
  // As of now we just support 1 workspace for slack, so just taking the first item is fine
  var token = security_objects[Object.keys(security_objects)[0]].token;
  return token;
}

window.getToken = getToken;

function getUserID() {
  var security_objects = JSON.parse(localStorage.getItem("localConfig_v2"))[
    "teams"
  ];
  // As of now we just support 1 workspace for slack, so just taking the first item is fine
  var userID = security_objects[Object.keys(security_objects)[0]].user_id;
  console.log(userID);
  return userID;
}

window.getUserID = getUserID;

class newNotification extends window.Notification {
  constructor(title, opt) {
    // By not calling super(), the notification cannot be sent with the HTML Notification API
    // rather, forward to main process, check for a focus session and use electrons Notifiation module to send notification
    console.log("notification", window.serviceId, title, opt);
    ipcRenderer.send("notification", {
      id: window.serviceId,
      title,
      body: opt.body,
    });
  }
  static permission = "granted";
}

window.Notification = newNotification;

window.getUnreadChats = () => {
  // taken from Franz
  const SELECTOR_CHANNELS_UNREAD =
    ".p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted)";
  const directMessages = document.querySelectorAll(
    `${SELECTOR_CHANNELS_UNREAD} .p-channel_sidebar__badge, .p-channel_sidebar__link--unread`
  ).length;
  const allMessages =
    document.querySelectorAll(SELECTOR_CHANNELS_UNREAD).length - directMessages;

  return allMessages + directMessages;
};
