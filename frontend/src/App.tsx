import { Route, Routes } from "react-router";
import LoginPage from "./pages/loginPage/LoginPage";
import UserPage from "./pages/userPage/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/:username" element={<UserPage />} />
    </Routes>
  );
}

export default App;
