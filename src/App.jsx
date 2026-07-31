import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import CharacterSelect from "./pages/CharacterSelect";
import Assistant from "./pages/Assistant";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={<Login />} />

      {/* Main Flow */}
      <Route path="/get-started" element={<Landing />} />
      <Route path="/initialize" element={<Loading />} />
      <Route path="/character-select" element={<CharacterSelect />} />
      <Route path="/assistant" element={<Assistant />} />
      <Route path="/history" element={<History />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;