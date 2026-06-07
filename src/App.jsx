import React, { useState } from "react";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";

const DEMO_USER = {
  fullName: "Sumedh Pawar",
  phone: "9527192987",
  email: "pawarsumedh@gmail.com",
  password: "123456",
  companyName: "PopX Inc.",
  isAgency: "yes",
  photo: null,
};

const App = () => {
  const [page, setPage] = useState("welcome");
  const [users, setUsers] = useState([DEMO_USER]);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = (target) => setPage(target);

  const handleRegister = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdatePhoto = (photoDataUrl) => {
    setCurrentUser((prev) => ({ ...prev, photo: photoDataUrl }));
    setUsers((prev) =>
      prev.map((u) =>
        u.email === currentUser?.email ? { ...u, photo: photoDataUrl } : u
      )
    );
  };

  const renderPage = () => {
    switch (page) {
      case "welcome":
        return <WelcomePage navigate={navigate} />;
      case "login":
        return <LoginPage navigate={navigate} onLogin={handleLogin} users={users} />;
      case "register":
        return <RegisterPage navigate={navigate} onRegister={handleRegister} />;
      case "account":
        return <AccountPage user={currentUser} onUpdatePhoto={handleUpdatePhoto} onLogout={handleLogout} navigate={navigate} />;
      default:
        return <WelcomePage navigate={navigate} />;
    }
  };

  return <div className="phone-wrapper">{renderPage()}</div>;
};

export default App;
