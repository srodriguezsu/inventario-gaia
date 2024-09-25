import React from 'react';
import {Typography} from "@mui/material";

import {useParams} from "react-router-dom";
import OrderForm from "./OrderForm";
import HeaderWithArrow from "../../../components/HeaderWithArrow";

const Index = () => {
    const { id } = useParams();
    return (
        <>
            <HeaderWithArrow>
                <Typography variant="h2">Pedido #{id}</Typography>
            </HeaderWithArrow>
            <OrderForm id={id}/>

        </>
    );
};

export default Index;