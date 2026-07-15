import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import CharacterSelect from "./pages/CharacterSelect";
import Assistant from "./pages/Assistant";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Loading */}
      <Route path="/loading" element={<Loading />} />

      {/* Character Selection */}
      <Route path="/character-select" element={<CharacterSelect />} />

      {/* Main Assistant */}
      <Route path="/assistant" element={<Assistant />} />

      {/* Chat History */}
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;