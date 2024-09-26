import React, { useEffect, useState } from 'react';
import {Button, CardMedia, CircularProgress, Stack, Tab, TextField} from '@mui/material';
import { WooCommerce } from '../../../API';
import { useAlert } from '../../../context/AlertContext';
import Cookies from "js-cookie";

const ProductForm = ({ id }) => {
    const { alertMessage } = useAlert();
    const [product, setProduct] = useState({
        name: '',
        regular_price: '',
        description: '',
        stock_quantity: '',
        sku: '',
    });
    const [loading, setLoading] = useState(true);
    const [isWorker, setIsWorker] = useState(true)

    // Fetch product details
    const fetchProduct = async () => {
        const url = 'products/' + id;
        try {
            const response = await WooCommerce.get(url);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            alertMessage('Error fetching product details', 'error');
            setLoading(false);
        }
    };

    // Update product details
    const onUpdate = async () => {
        setLoading(true);
        const url = 'products/' + id;
        WooCommerce.put(url, product)
            .then(() => {
                alertMessage('Producto actualizado con éxito', 'success');
            })
            .catch(() => {
                alertMessage('Algo salió mal', 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Handle input changes
    const handleInput = (e) => {
        const { id, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [id]: value,
        }));
    };

    useEffect(() => {
        const loginStatus = Cookies.get('loginStatus');
        if (loginStatus === 'socio'){
            setIsWorker(false)
        }
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <>
                <CircularProgress color="inherit" />
            </>
        );
    }

    return (
        <Stack spacing={4} sx={{ margin: '16px 0 0 0' }}>
            {product?.images?.length > 0 && (
                <CardMedia
                    component="img"
                    height="300"
                    image={product?.images[0].src}
                    alt={product?.images[0].alt || 'Imagen del producto'}
                />
            )}


            <TextField
                id="name"
                label="Nombre del Producto"
                disabled={isWorker}
                value={product.name}
                onChange={handleInput}
            />
            <TextField
                id="sku"
                label="SKU"
                disabled={isWorker}
                value={product.sku}
                onChange={handleInput}
            />
            <TextField
                disabled={isWorker}
                id="regular_price"
                label="Precio"
                value={product.regular_price}
                onChange={handleInput}
            />
            <TextField
                disabled={isWorker}

                id="short_description"
                label="Descripción corta"
                value={product.short_description}
                onChange={handleInput}
            />
            <TextField
                disabled={isWorker}

                id="description"
                label="Descripción"
                value={product.description}
                onChange={handleInput}
            />
            <TextField
                id="stock_quantity"
                label="Disponibilidad"
                value={product.stock_quantity}
                onChange={handleInput}
            />
            <Button variant="contained" onClick={onUpdate}>
                Actualizar
            </Button>
        </Stack>
    );
};

export default ProductForm;
