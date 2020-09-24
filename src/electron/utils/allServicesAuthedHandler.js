const {
  getCurrentFocusSession,
  getAllFutureFocusSessions,
  deleteFutureFocusSession,
} = require("../db/db");

const { getFocus } = require("../db/memoryDb");

const focusStart = require("../utils/focusStart");
const focusEnd = require("../utils/focusEnd");
const scheduleFocus = require("../utils/scheduleFocus");

module.exports = () => {
  console.log("all services authed");

  // check if there is a currentFocus Session in the db and we have not started it yet -> start automatically
  const currentFocusSession = getCurrentFocusSession();
  const futureFocusSessions = getAllFutureFocusSessions();
  if (currentFocusSession && !getFocus()) {
    // still going?
    if (currentFocusSession.endTime > new Date().getTime()) {
      console.log("current focus session found, starting..");
      focusStart(
        currentFocusSession.startTime,
        currentFocusSession.endTime,
        currentFocusSession.id
      );
    } else {
      // end the currentFocusSession
      console.log("current focus session already ended, ending..");
      focusEnd();
    }
  }
  // check if there are future focus Sessions -> register them again
  futureFocusSessions.forEach((focusSession) => {
    if (focusSession.endTime > new Date().getTime()) {
      // end in the future
      console.log("future session found, registering..");
      scheduleFocus(
        focusSession.startTime,
        focusSession.endTime,
        focusSession.id
      );
    } else {
      console.log("future session is completely in the past, deleting..");
      deleteFutureFocusSession(focusSession.id);
    }
  });
};