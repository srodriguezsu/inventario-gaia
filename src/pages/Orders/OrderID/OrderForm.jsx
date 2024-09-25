import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress, List, ListItem, ListItemText,
    MenuItem,
    Select,
    Stack,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from '@mui/material';
import { WooCommerce } from '../../../API';
import { useAlert } from '../../../context/AlertContext';
import {formatter} from "../../../components/utils";


const OrderForm = ({ id }) => {
    const { alertMessage } = useAlert();
    const [order, setOrder] = useState({
        status: '',
        total: '',
        customer_note: '',
        shipping: {
            first_name: '',
            last_name: '',
            address_1: '',
            city: '',
            postcode: '',
        },
        products: []
    });
    const [loading, setLoading] = useState(true);

    // Fetch order details
    const fetchOrder = async () => {
        const url = 'orders/' + id;
        try {
            const response = await WooCommerce.get(url);

            // Extraer solo los campos necesarios
            const fetchedOrder = {
                status: response.data.status || '',
                total: response.data.total || '',
                customer_note: response.data.customer_note || '',
                shipping: {
                    first_name: response.data.shipping?.first_name || '',
                    last_name: response.data.shipping?.last_name || '',
                    address_1: response.data.shipping?.address_1 || '',
                    city: response.data.shipping?.city || '',
                    postcode: response.data.shipping?.postcode || '',
                },
                products: response.data.line_items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    total: item.total
                })) || []
            };

            setOrder(fetchedOrder); // Actualiza el estado con los valores filtrados
            setLoading(false);
        } catch (error) {
            alertMessage('Error al obtener los detalles del pedido', 'error');
            setLoading(false);
        }
    };


    // Update order details
    const onUpdate = async () => {
        setLoading(true);
        const url = 'orders/' + id;

        WooCommerce.put(url, order)
            .then(() => {
                alertMessage('Pedido actualizado con éxito', 'success');
            })
            .catch(() => {
                alertMessage('Algo salió mal', 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Handle input changes
    const handleStatusChange = (e) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            status: e.target.value,
        }));
    };

    const handleInput = (e) => {
        const { id, value } = e.target;
        const [field, subfield] = id.split('.');

        if (subfield) {
            setOrder((prevOrder) => ({
                ...prevOrder,
                [field]: {
                    ...prevOrder[field],
                    [subfield]: value,
                },
            }));
        } else {
            setOrder((prevOrder) => ({
                ...prevOrder,
                [id]: value,
            }));
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (loading) {
        return <CircularProgress color="inherit" />;
    }

    return (
        <Stack spacing={2} sx={{ margin: '16px 0 0 0' }}>



            <Box sx={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-around"}}>
                <Box sx={{flex:1}}>
                    <Typography variant="h3">Información de Envío</Typography>
                    <List>
                        <ListItem>
                            <ListItemText
                                secondary="Nombre"
                                primary={order.shipping.first_name || "No especificado"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                secondary="Apellido"
                                primary={order.shipping.last_name || "No especificado"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                secondary="Dirección"
                                primary={order.shipping.address_1 || "No especificado"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                secondary="Ciudad"
                                primary={order.shipping.city || "No especificado"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                secondary="Código Postal"
                                primary={order.shipping.postcode || "No especificado"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                secondary="Nota del Cliente"
                                primary={order.customer_note || "No hay nota del cliente"}
                            />
                        </ListItem>
                    </List>
                </Box>
                <Stack spacing={4} sx={{flex:2}}>
                    <Typography variant="h3">Productos del Pedido</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.products.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{formatter.format(product.total)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="h3">Ajustes</Typography>
                    <Select
                        id="status"
                        label="Estado del Pedido"
                        value={order.status}
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="pending">Pendiente</MenuItem>
                        <MenuItem value="processing">Procesando</MenuItem>
                        <MenuItem value="on-hold">En espera</MenuItem>
                        <MenuItem value="completed">Completado</MenuItem>
                        <MenuItem value="cancelled">Cancelado</MenuItem>
                        <MenuItem value="refunded">Reembolsado</MenuItem>
                        <MenuItem value="failed">Fallido</MenuItem>
                    </Select>
                    <TextField
                        id="total"
                        label="Total"
                        value={order.total}
                        onChange={handleInput}
                    />
                    <Button variant="contained" onClick={onUpdate}>
                        Actualizar Pedido
                    </Button>
                </Stack>
            </Box>




        </Stack>
    );
};

export default OrderForm;
