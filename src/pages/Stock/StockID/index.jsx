import React from 'react';
import {Stack, Typography} from "@mui/material";


import {useParams} from "react-router-dom";
import HeaderWithArrow from "../../../components/HeaderWithArrow";
import StocksForm from "./StocksForm";

const Index = () => {
    const { id } = useParams();


    return (
        <Stack spacing={4}>
            <HeaderWithArrow>
                <Typography variant="h2">Insumo #{id}</Typography>
            </HeaderWithArrow>
            <StocksForm id={id}/>

        </Stack>
    );
};

export default Index;