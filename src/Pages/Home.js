import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../components/Colors";
import MenuBoxes from "../components/Main/MenuBoxes";
import NewFocusSession from "../components/Main/NewFocusSession";
import ScheduleFocusSession from "../components/Main/ScheduleFocusSession";

export const HomeDiv = styled.div`
  position: absolute;
  z-index: 1;
  height: 100vh;
  width: 100%;
  background: ${Colors.snow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ParagraphText = styled.p`
  color: ${Colors.navy};
`;

function Home(props) {
  const [newFocusSessionDialogOpen, setNewFocusSessionDialogOpen] = useState(
    false
  );
  const [
    scheduleFocusSessionDialogOpen,
    setScheduleFocusSessionDialogOpen,
  ] = useState(false);

  const openNewFocusSessionDialog = () => {
    setNewFocusSessionDialogOpen(true);
  };

  const closeNewFocusSessionDialog = () => {
    setNewFocusSessionDialogOpen(false);
  };

  const openScheduleSessionDialog = () => {
    setScheduleFocusSessionDialogOpen(true);
  };

  const closeScheduleSessionDialog = () => {
    setScheduleFocusSessionDialogOpen(false);
  };

  return (
    <HomeDiv>
      <h1 style={{ color: Colors.turquoise }}> EXPECTATION MANAGEMENT</h1>
      <ParagraphText>
        Welcome to your expectation management app. When you need to focus, we
        will take care of the incoming communications while you are away.
      </ParagraphText>
      <ParagraphText>
        To begin, add your apps and click focus now or schedule your next focus
        session.
      </ParagraphText>
      <MenuBoxes
        handleFocusNow={openNewFocusSessionDialog}
        handleScheduleFocus={openScheduleSessionDialog}
      />
      <NewFocusSession
        open={newFocusSessionDialogOpen}
        closeDialog={closeNewFocusSessionDialog}
      />
      <ScheduleFocusSession
        open={scheduleFocusSessionDialogOpen}
        closeDialog={closeScheduleSessionDialog}
      />
      <p> Currently added {props.nrOfServices} service/s </p>
    </HomeDiv>
  );
}

export default Home;