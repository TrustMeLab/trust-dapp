import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Loading } from "./commons/components/Loading";
import { SignUp } from "./modules/user/components/Signup";
import { Dashboard } from "./modules/dashboard/components/Dashboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
