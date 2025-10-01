import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Details from "./Details";
import Workspace from "./Workspace";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute type="admin">
              <Workspace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute type="employee">
              <Details />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
