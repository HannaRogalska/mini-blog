import { Route, Routes } from "react-router";
import LoginPage from "./pages/loginPage/LoginPage";
import UserPage from "./pages/userPage/UserPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import MainPage from "./pages/mainPage/mainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/:username" element={<UserPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
