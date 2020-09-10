import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Colors from "../components/Colors";
import Countdown from "../components/Main/Countdown";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Tooltip from "@material-ui/core/Tooltip";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import PreFocusPopup from "../Popups/PreFocusPopup";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export const FocusDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  background: ${Colors.turquoise};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FocusText = styled.p`
  color: ${Colors.navy};
  font-size: 30px;
  text-align: center;
`;

const FocusMenuButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

function Focus(props) {
  let history = useHistory();

  const [showPreFocusPopup, setshowPreFocusPopup] = useState(true);

  const escapeFocus = () => {
    // send ipc message to main process to start session there too (db etc)
    ipcRenderer.send("focus-end-request");
  };

  const minimizeFocus = () => {
    //navigate back home without ending focus session
    history.push("/");
  };

  return (
    <FocusDiv>
      {showPreFocusPopup ? (
        <PreFocusPopup closePreFocusPopup={() => setshowPreFocusPopup(false)} />
      ) : null}

      <h1 style={{ color: Colors.navy, fontSize: 80, textAlign: "center" }}>
        STAY FOCUSED!
      </h1>
      <Countdown focusLength={props.focusLength} />
      <FocusText>We are taking care of your messages for you.</FocusText>
      <FocusMenuButtons>
        <Tooltip title="End focus session" arrow placement="top">
          <HighlightOffIcon
            onClick={escapeFocus}
            style={{ color: Colors.snow, fontSize: 80, margin: "2rem" }}
          />
        </Tooltip>
        <Tooltip title="Break focus to see chat" arrow placement="top">
          <QuestionAnswerIcon
            onClick={minimizeFocus}
            style={{ color: Colors.snow, fontSize: 80, margin: "2rem" }}
          />
        </Tooltip>
      </FocusMenuButtons>
    </FocusDiv>
  );
}

export default Focus;