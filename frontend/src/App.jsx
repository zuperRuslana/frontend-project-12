import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login  from "./pages/LoginPage";
import  NotFound from "./pages/NotFoundPage";
import  Chats  from "./pages/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chats />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
