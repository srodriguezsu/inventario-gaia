import React from 'react';
import {Typography} from "@mui/material";
import OrdersTable from "./OrdersTable";

const Index = () => {
    return (
        <>
            <Typography variant="h1">Pedidos</Typography>
            <OrdersTable/>
        </>
    );
};

export default Index;