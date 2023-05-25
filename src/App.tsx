import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { SecureComponent } from "./components/atoms/SecureRoute";

function App() {
  return (
    <BrowserRouter>
      <SecureComponent
        unAuthComponent={
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        }
      >
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </SecureComponent>
    </BrowserRouter>
  );
}

export default App;
