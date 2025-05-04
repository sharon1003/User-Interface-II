import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Design from "./pages/Design";
import Cart from "./pages/Cart";
import ShopPage from "./pages/Shop"
import PaymentPage from "./pages/PaymentPage"
import {CartProvider} from "./components/CartContext";
import CustomYourOwnPage from "./pages/CustomYourPage";
import CustomizePage from "./pages/CustomizePage";

function App() {
    return (
        <CartProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/design" element={<Design/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/shop" element={<ShopPage/>}/>
                    <Route path="/payment" element={<PaymentPage/>}/>
                    <Route path="/custom-your-nail" element={<CustomizePage/>}></Route>
                </Routes>
            </Router>
        </CartProvider>
            );
        }

export default App;
