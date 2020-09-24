const { webContents } = require("electron");

const Service = require("../services/Service");
const { setUnreadChats } = require("../db/db");

module.exports = class WhatsappService extends Service {
  constructor(id, autoResponse, checkIfAllAuthed) {
    console.log("creating whatsapp service");
    super(id, "whatsapp", autoResponse, checkIfAllAuthed);
  }

  unReadLoop() {
    console.log("unread loop start", this.name);

    const ref = setInterval(async () => {
      const unreadChats = await webContents
        .fromId(this.webContentsId)
        .executeJavaScript("window.getUnreadChats()");

      this.unreadCount = unreadChats;
      // set in db
      setUnreadChats(this.id, unreadChats);
    }, 1000);

    this.intervallRefs.push(ref);
  }

  authLoop() {
    console.log("auth loop start", this.name);

    const ref = setInterval(async () => {
      const isAuth = await webContents
        .fromId(this.webContentsId)
        .executeJavaScript("window.isAuth()");

      this.setAuthed(isAuth);
    }, 1000);

    this.intervallRefs.push(ref);
  }

  messagesLoop() {}

  setDnd(diffMins) {}

  setOnline() {}

  getMessages(startTime) {}

  sendMessage(channel, message) {}
};