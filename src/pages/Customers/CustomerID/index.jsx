import React, {useState} from 'react';
import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {useAlert} from "../../../context/AlertContext";
import {WooCommerce} from "../../../API";
import {useParams} from "react-router-dom";
import CustomerForm from "./CustomerForm";
import HeaderWithArrow from "../../../components/HeaderWithArrow";

const CustomerID = () => {

    const { id } = useParams();



    return (
        < >
            <HeaderWithArrow>
                <Typography variant="h2">Cliente #{id}</Typography>
            </HeaderWithArrow>

            <CustomerForm id={id}/>

        </>
    );
};

export default CustomerID;