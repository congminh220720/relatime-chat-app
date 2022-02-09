import React, { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMembersVisible, setIsInviteMembersVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const { uid } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const selectedRoom = useMemo(() => {
    return rooms.find((room) => {
      return room.id === selectedRoomId;
    });
  }, [rooms, selectedRoomId]);

  const userCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom?.members,
    };
  }, [selectedRoom?.members]);

  const members = useFirestore("users", userCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMembersVisible,
        setIsInviteMembersVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
