const { ipcMain } = require("electron");
const servicesManager = require("../services/ServicesManger");
const { updateAutoresponse } = require("../db/db");

ipcMain.on("updateAutoResponse", (e, message) => {
  updateAutoresponse(message);
});

ipcMain.on("toggleAutoResponse", (e, id) => {
  const service = servicesManager.getService(id);
  service.toggleAutoResponseAvailablity();
});

ipcMain.on("getAutoResponseStatus", (e, id) => {
  const service = servicesManager.getService(id);
  return service.autoResponse;
});
