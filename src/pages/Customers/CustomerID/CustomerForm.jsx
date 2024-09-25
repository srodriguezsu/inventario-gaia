import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Stack, TextField, Typography} from "@mui/material";
import {WooCommerce} from "../../../API";
import {useAlert} from "../../../context/AlertContext";

const CustomerForm = ({id}) => {
    const url = "customers/" + id
    const { alertMessage } = useAlert();
    const [customer, setCustomer] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
    });
    const [loading, setLoading] = useState(true);
    const fetchCustomer = async () => {
        const url = "customers/" + id
        try {
            const response = await WooCommerce.get(url);
            setCustomer(response.data);
            setLoading(false);
        } catch {
            setLoading(false);
        }
    };
    const onUpdate = async () => {
        setLoading(true)


        WooCommerce.put(url, customer)
            .then(() => {
                alertMessage("Cliente actualizado con éxito", "success");
            })
            .catch(() => {
                alertMessage("Algo salió mal", "error");
            })
            .then(()=>{
                setLoading(false)
            });
    };
    const handleInput = (e) => {
        const { id, value } = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [id]: value,
        }));
    };
    useEffect(() => {
        fetchCustomer().then();
    }, []);

    if (loading) {
        return (
            <>
                <CircularProgress color="inherit" />
            </>
        );
    }
    return (
        <Stack spacing={4} sx={{margin:'16px 0 0 0'}}>
            <Typography variant="h3">Nombre de usuario: {customer.username}</Typography>

            <TextField id="first_name" label="Nombre" value={customer.first_name} onChange={handleInput} />
            <TextField id="last_name" label="Apellido" value={customer.last_name} onChange={handleInput} />
            <TextField id="email" label="Correo Electrónico" value={customer.email} onChange={handleInput} />

            <Button variant="contained" onClick={onUpdate}>Actualizar</Button>
        </Stack>
    );
};

export default CustomerForm;