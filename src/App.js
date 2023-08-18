import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import RootLayout from "./pages/layout/components/RootLayout";
import CreateProjectPage from "./pages/CreateProjectPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ImpressumPage from "./components/Impressum";
import ImpressumPage2 from "./components/Impressum2";

const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />
      },
      {
        path: "create-link",
        element: <CreateProjectPage />
      },
    ]
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/impressum",
    element: <ImpressumPage />,
  },
  {
    path: "/impressum_",
    element: <ImpressumPage2 />,
  }
])

const App=() => {
  return <RouterProvider router={routes} />

}

export default App;
