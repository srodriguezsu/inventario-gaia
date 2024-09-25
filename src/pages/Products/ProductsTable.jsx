import React, { useEffect, useState } from 'react';
import {CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WooCommerce } from '../../API';
import { useAlert } from '../../context/AlertContext';
import {formatter} from "../../components/utils";

const ProductsTable = () => {
    const { alertMessage } = useAlert();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch WooCommerce products
    const fetchProducts = async () => {
        WooCommerce.get("products")
            .then((response) => {
                setProducts(response.data);
                alertMessage("Lista de productos actualizada con éxito", "success");
            })
            .catch((error) => {
                alertMessage(error.response?.data.message || "Algo salió mal", "error");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <>
                <CircularProgress color="inherit" />
            </>
        );
    }

    return (

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Disponibilidad</TableCell>
                            <TableCell>Categorías</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => {
                            return (
                                <TableRow key={product.id} onClick={() => navigate('/productos/' + product.id)}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{formatter.format(Number(product.regular_price))}</TableCell>
                                    <TableCell>{product.stock_quantity}</TableCell>
                                    <TableCell>{product.categories.map((category) => category.name).join(' - ')}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </TableContainer>

    );
};

export default ProductsTable;
