import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Login } from "./pages/auth/Login.jsx";
import Home from "./pages/home/Home.jsx";
import Transaction from "./pages/transactions/Transactions.jsx";
import Players from "./pages/players/Players.jsx";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import WinLoss from "./pages/winloss/WinLoss.jsx";
import "../src/globalStyling.css";
import BetSummary from "./pages/betsummary/BetSummary.jsx";
import AgentList from "./pages/agentlist/AgentList.jsx";
import ProfitLoss from "./pages/profitloss/ProfitLoss.jsx";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

function AuthWrapper({ children }) {
  const authToken = localStorage.getItem("token_gasv");
  return authToken ? children : <Login />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <AuthWrapper>
        <Home />
      </AuthWrapper>
    ),
  },
  {
    path: "/transactions",
    element: (
      <AuthWrapper>
        <Transaction />
      </AuthWrapper>
    ),
  },
  {
    path: "/players",
    element: (
      <AuthWrapper>
        <Players />
      </AuthWrapper>
    ),
  },
  {
    path: "/winloss",
    element: (
      <AuthWrapper>
        <WinLoss />
      </AuthWrapper>
    ),
  },
  {
    path: "/agent-list",
    element: (
      <AuthWrapper>
        <AgentList />
      </AuthWrapper>
    ),
  },
  {
    path: "/bet-summary",
    element: (
      <AuthWrapper>
        <BetSummary />
      </AuthWrapper>
    ),
  },
  {
    path: "/profit-loss",
    element: (
      <AuthWrapper>
        <ProfitLoss />
      </AuthWrapper>
    ),
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
    <MantineProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </MantineProvider>
    </I18nextProvider>
  </React.StrictMode>
);
