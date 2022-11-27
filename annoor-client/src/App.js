import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/Authentication/SignIn/SignIn";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import PublicLayout from "./components/PublicLayout/PublicLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Products />} />
          <Route path="/:category" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signIn" element={<SignIn />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
