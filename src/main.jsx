import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login.jsx';
import ChatBot from './Pages/ChatBot.jsx';
import Layout from "./layout.jsx";
import Form from "./Pages/Form.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import SignUp from "./Pages/SignUp.jsx";
import FrameWrapper from "./FrameWrapper.jsx";
import "keen-slider/keen-slider.min.css";
import PortfolioStrategy from "./Pages/PortfolioStrategy.jsx";
import HowItWorks from "./Pages/HowItWorks.jsx";
import RiskProfile from "./Pages/RiskProfile.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/chat",
        element: <ChatBot />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <PortfolioStrategy />,
      },
      {
        path: "/howitworks",
        element: <HowItWorks />,
      },
      {
        path: "/riskprofile",
        element: <RiskProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FrameWrapper>
      <RouterProvider router={router} />
    </FrameWrapper>
  </StrictMode>
);
