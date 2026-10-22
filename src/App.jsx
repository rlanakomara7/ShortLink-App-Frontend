import { BrowserRouter, Routes, Route } from "react-router";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateLink from "./pages/CreateLink";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/links/create" element={<CreateLink />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
