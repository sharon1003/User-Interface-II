import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Design from "./pages/Design";
import Cart from "./pages/Cart";
import NailArtPage from "./pages/NailArtPage";
import GelManicure from "./pages/GelManicure"
import NatureCare from "./pages/NaturalCare";
import ShopPage from "./pages/Shop"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/nail-art" element={<NailArtPage />} /> {/* 新增這條路由 */}
        <Route path="/shop/gel-manicure" element={<GelManicure />}></Route>
        <Route path="/shop/natural-care" element={<NatureCare />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
