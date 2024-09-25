import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog, DialogActions,
    DialogTitle, Stack, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import {useAlert} from "../../context/AlertContext";
import {useNavigate} from "react-router-dom";
import {addSupplyToDB, getSuppliesFromDB} from "../../components/SuppliesDB";


const Stock = () => {
    const [open, setOpen] = useState(false);
    const [newSupply, setNewSupply] = useState({
        name: "",
        stock_quantity: 0,
    });
    const [supplies, setSupplies] = useState([]);
    const { alertMessage } = useAlert();
    const navigate = useNavigate();
    const handleInput = (e) => {
        const { id, value } = e.target;

        setNewSupply((prevSupply) => ({
            ...prevSupply,
            [id]: id === 'stock_quantity' ? Number(value) : value, // Ensure stock_quantity is a number
        }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewSupply({ name: "", stock_quantity: 0 });
    };

    useEffect(() => {
        getSuppliesFromDB().then(res => {
            setSupplies(res);
        });
    }, [open]);
    return (
        <>
            <Typography variant="h1">Inventario</Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Disponibilidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {supplies.map((supply, index) => (
                            <TableRow key={index} onClick={() => navigate('/inventario/' + supply.id)}>
                                <TableCell>{supply.id}</TableCell>
                                <TableCell>{supply.name}</TableCell>
                                <TableCell>{supply.stock_quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

            <Button variant="outlined" onClick={handleClickOpen}>
                Añadir nuevo
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();

                        if (newSupply && newSupply.stock_quantity >= 0) {
                            alertMessage("Insumo creado con éxito", "success");
                            addSupplyToDB(newSupply).then();
                            handleClose();
                        } else {
                            alertMessage("Algo salió mal", "error");
                        }
                    },
                }}
            >
                <DialogTitle>Añadir nuevo insumo</DialogTitle>
                <Stack sx={{ margin: '16px' }} spacing={4}>
                    <TextField
                        required
                        id="name"
                        label="Nombre"
                        variant="standard"
                        onChange={handleInput}
                    />
                    <TextField
                        required
                        id="stock_quantity"
                        label="Cantidad"
                        variant="standard"
                        type="number" // Ensure it's a number input
                        onChange={handleInput}
                    />
                </Stack>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Añadir</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Stock;