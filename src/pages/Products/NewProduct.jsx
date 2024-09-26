import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogTitle, MenuItem, Select, Stack, TextField} from "@mui/material";
import {useAlert} from "../../context/AlertContext";
import {WooCommerce} from "../../API";
import Cookies from "js-cookie";

const defaultProduct = {
    name: "",
    manage_stock: true,
    type: "simple",
    regular_price: 20000,
    stock_quantity: 0,
    description: "",
    short_description: "",
    categories: [],
}

const NewProduct = () => {
    const [open, setOpen] = useState(false);
    const [isWorker, setIsWorker] = useState(true)
    const [possibleCategories, setPossibleCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState();
    const [newProduct, setNewProduct] = useState(defaultProduct);
    const { alertMessage } = useAlert();


    const handleInput = (e) => {
        const { id, value } = e.target;

        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [id]: value, // Ensure stock_quantity is a number
        }));
    };

    const fetchCategories = ()=>{
        WooCommerce.get("products/categories")
            .then((response) => {
                setPossibleCategories(response.data)
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };
    const handleStatusChange = (event) => {
        setSelectedCategory(event.target.value);
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            categories: [{id: event.target.value},],
        }))
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewProduct(defaultProduct);

    };

    useEffect(() => {
        const loginStatus = Cookies.get('loginStatus');
        if (loginStatus === 'socio'){
            setIsWorker(false)
        }
        fetchCategories()
    }, []);
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} disabled={isWorker}>
                Añadir nuevo
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}

                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        console.log(newProduct);
                        WooCommerce.post("products", newProduct)
                            .then((response) => {
                                console.log(response.data);
                                alertMessage("Producto creado con éxito", "success");
                            })
                            .catch((error) => {
                                console.log(error.response.data);
                                alertMessage("Algo salió mal", "error");

                            });
                        handleClose()


                    },
                }}
            >
                <DialogTitle>Añadir nuevo producto</DialogTitle>
                <Stack sx={{ margin: '24px' }} spacing={4}>
                    <TextField
                        required
                        id="name"
                        label="Nombre"
                        variant="standard"
                        onChange={handleInput}
                    />
                    <TextField
                        required
                        id="regular_price"
                        label="Precio"
                        variant="standard"
                        onChange={handleInput}
                    />

                    <TextField
                        required
                        id="description"
                        label="Descripción"
                        variant="standard"
                        onChange={handleInput}
                    />
                    <TextField
                        required
                        id="short_description"
                        label="Descripción corta"
                        variant="standard"
                        onChange={handleInput}
                    />
                    <TextField
                        required
                        id="stock_quantity"
                        label="Cantidad"
                        variant="standard"
                        onChange={handleInput}
                    />
                    <Select value={selectedCategory} onChange={handleStatusChange} displayEmpty>
                        {possibleCategories?.map((category)=>{
                            return(
                                <MenuItem value={category.id}>{category.name}</MenuItem>
                            )
                        })}
                    </Select>
                </Stack>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Añadir</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NewProduct;