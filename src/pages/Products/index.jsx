import React from 'react';
import {Typography} from "@mui/material";
import CustomersTable from "../Customers/CustomersTable";
import ProductsTable from "./ProductsTable";

const Products = () => {
    return (
        <>
            <Typography variant="h1">Productos</Typography>
            <ProductsTable/>
        </>
    );
};

export default Products;