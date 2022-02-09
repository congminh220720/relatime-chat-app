import Login from "./Components/Login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ChatRoom from "./Components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModals from "./Components/Modals/AddRoomModals";
import InviteMemberModal from "./Components/Modals/InviteMemberModal";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Route component={Login} path="/login" />
              <Route component={ChatRoom} path="/" />
            </Switch>
            <AddRoomModals />
            <InviteMemberModal />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
