import React from 'react';
import {Typography} from "@mui/material";
import CustomersTable from "../Customers/CustomersTable";
import ProductsTable from "./ProductsTable";
import NewProduct from "./NewProduct";

const Products = () => {
    return (
        <>
            <Typography variant="h1">Productos</Typography>
            <ProductsTable/>

            <NewProduct/>
        </>
    );
};

export default Products;