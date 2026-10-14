import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import UserRegister from "./components/User/UserRegister";
import UserLogin from "./components/User/UserLogin";
import DashboardLayout from "./components/DashboardLayout";
import UserProfile from "./components/User/UserProfile";
import UserLogout from "./components/User/UserLogout";
import ApplicationCreate from "./components/Application/ApplicationCreate";
import ApplicationList from "./components/Application/ApplicationList";
import ApplicationEdit from "./components/Application/ApplicationEdit";
import ApplicationDetail from "./components/Application/ApplicationDetail";
import Homepage from "./components/Homepage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<UserRegister />}></Route>
          <Route path="/login" element={<UserLogin />}></Route>
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users">
            <Route path="profile" element={<UserProfile />} />
            <Route path="logout" element={<UserLogout />} />
          </Route>

          <Route path="applications">
            <Route index element={<ApplicationList />}></Route>
            <Route path="create" element={<ApplicationCreate />} />
            <Route path=":id" element={<ApplicationDetail />} />
            <Route path=":id/edit" element={<ApplicationEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
