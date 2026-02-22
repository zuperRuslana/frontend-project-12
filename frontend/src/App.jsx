import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login  from "./pages/LoginPage";
import  NotFound from "./pages/NotFoundPage";
import  Chats  from "./pages/ChatPage";
import  Signup  from "./pages/SignUpPage";
import { Header } from "./components/Header";


function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path="/" element={<Chats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
