import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SinglePage from "./routes/singlePage";
import Home from "./routes/home";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/specimen/:familyId" element={<SinglePage />} />
      </Routes>
  );
}

export default App;
