import React from 'react';
import {Typography} from "@mui/material";
import CustomerForm from "../../Customers/CustomerID/CustomerForm";
import {useParams} from "react-router-dom";
import ProductForm from "./ProductForm";
import HeaderWithArrow from "../../../components/HeaderWithArrow";

const Index = () => {
    const { id } = useParams();
    return (
        <>
            <HeaderWithArrow>
                <Typography variant="h2">Producto #{id}</Typography>

            </HeaderWithArrow>
            <ProductForm id={id}/>

        </>
    );
};

export default Index;