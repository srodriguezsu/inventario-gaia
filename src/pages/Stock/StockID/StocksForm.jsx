import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, TextField, Typography} from "@mui/material";
import {getSupplyById, updateSupply} from "../../../components/SuppliesDB";
import {useAlert} from "../../../context/AlertContext";

const StocksForm = ({id}) => {
    const [supply, setSupply] = useState(); // Allow supply to be null
    const [loading, setLoading] = useState(true);
    const { alertMessage } = useAlert();


    const handleInput = (e) => {
        const { id, value } = e.target;

        setSupply((prevSupply) => {
            if (!prevSupply) return null; // Handle case where supply is null
            return {
                ...prevSupply,
                [id]: id === 'stock_quantity' ? Number(value) : value,
            };
        });
    };
    const fetchSupply = async () => {
        try {
            const res = await getSupplyById(Number(id));
            if (res) {
                setSupply(res);
            } else {
                alertMessage("Insumo no encontrado", "error");
            }
        } catch (error) {
            alertMessage("Error", "error");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchSupply().then();
    }, [id, alertMessage]);
    if (loading) {
        return (
            <>
                <Typography variant="h2">Insumo {id}...</Typography>
                <CircularProgress color="inherit" />
            </>
        );
    }

    if (!supply) {
        return <Typography variant="h2">No se encontró el insumo</Typography>;
    }
    return (
        <>
            <TextField
                id='name'
                label="Nombre"
                value={supply.name}
                onChange={handleInput}
            />
            <TextField
                id='price'
                label="Precio Unitario"
                type="number"
                value={supply.price}
                onChange={handleInput}
            />
            <TextField
                id='stock_quantity'
                label="Cantidad"
                type="number"
                value={supply.stock_quantity.toString()}
                onChange={handleInput}
            />
            <TextField
                id='provider'
                label="Proveedor"

                value={supply.provider}
                onChange={handleInput}
            />
            <Button onClick={() => {
                if (supply) {
                    updateSupply(Number(id), supply)
                        .then(() => {
                            alertMessage('Guardado con éxito', "success");
                        })
                        .catch(() => {
                            alertMessage("Algo salió mal", "error");
                        });
                }
            }}>
                Guardar
            </Button>
        </>
    );
};

export default StocksForm;