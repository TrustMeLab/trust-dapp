import {createContext, Suspense} from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import { theme } from "./theme";
import { Loading } from "./commons/components/Loading";
import { SignUp } from "./modules/user/components/Signup";
import { Dashboard } from "./modules/dashboard/components/Dashboard";
import GuardedRoute from "./commons/components/GuardedRoute";
import {useProfile} from "./contexts/ProfileContext";

function App() {
  const { hasProfile } = useProfile()
  const routes = createBrowserRouter([
    { path: '/', element: <p>Hello World!</p> },
    { path: '/sign-up', element: <SignUp /> },
    GuardedRoute({ path: '/dashboard', element: <Dashboard/> }, true)
  ])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} fallbackElement={<Loading/>}/>
    </ThemeProvider>
  );
}

export default App;
