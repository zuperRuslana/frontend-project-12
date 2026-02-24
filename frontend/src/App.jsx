import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login  from "./pages/LoginPage";
import  NotFound from "./pages/NotFoundPage";
import  Chats  from "./pages/ChatPage";
import  Signup  from "./pages/SignUpPage";
import { Header } from "./components/Header";
import { I18nextProvider } from 'react-i18next';
import i18next from '../init';
import { ToastContainer } from 'react-toastify';

function App() {
 

  return (
    <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <ToastContainer theme="dark" />
        <Header/>
      <Routes>
        <Route path="/" element={<Chats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </I18nextProvider>
    </BrowserRouter>
      );
}
export default App;
