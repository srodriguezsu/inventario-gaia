import './App.css';
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Customers from "./pages/Customers";
import Stock from "./pages/Stock";
import Products from "./pages/Products";
import Login from "./pages/Login";
import {AlertContextProvider} from "./context/AlertContext";
import {ThemeProvider} from "@mui/material";
import mainTheme from "./mainTheme";
import MainMenu from "./components/MainMenu";
import CustomerID from "./pages/Customers/CustomerID";
import ProductID from "./pages/Products/ProductID";
import Orders from "./pages/Orders";
import OrderID from "./pages/Orders/OrderID";
import StockID from "./pages/Stock/StockID"; // Import the router components

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
                <AlertContextProvider>
                    <div>

                        <MainMenu>
                            <Routes>
                                <Route path='/' element={<Home/>}/>

                                <Route path='/clientes' element={<Customers/>}/>
                                <Route path='/clientes/:id' element={<CustomerID />} />

                                <Route path='/inventario' element={<Stock/>}/>
                                <Route path='/inventario/:id' element={<StockID />} />

                                <Route path='/productos' element={<Products/>}/>
                                <Route path='/productos/:id' element={<ProductID />} />

                                <Route path='/pedidos' element={<Orders/>}/>
                                <Route path='/pedidos/:id' element={<OrderID />} />

                                <Route path='/login' element={<Login/>}/>
                            </Routes>
                        </MainMenu>

                    </div>
                </AlertContextProvider>
            </ThemeProvider>


        </BrowserRouter>
    );
}


export default App;
