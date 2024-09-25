import React, { useEffect, useState } from 'react';
import {
    CircularProgress,
    MenuItem, Select,
    Tab, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useAlert} from "../../context/AlertContext";
import {WooCommerce} from "../../API";
import {formatter, translateStatus} from "../../components/utils";


const OrdersTable = () => {
    const { alertMessage } = useAlert();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredStatus, setFilteredStatus] = useState('');
    const navigate = useNavigate();

    // Fetch WooCommerce orders
    const fetchOrders = async () => {
        try {
            const response = await WooCommerce.get("orders");
            setOrders(response.data);
            alertMessage("Lista de pedidos actualizada con éxito", "success");
        } catch (error) {
            alertMessage(error.response?.data.message || "Error al obtener los pedidos", "error");
        } finally {
            setLoading(false);
        }
    };
    const handleStatusChange = (event) => {
        setFilteredStatus(event.target.value);
    };
    const filteredOrders = filteredStatus
        ? orders.filter((order) => order.status === filteredStatus)
        : orders; // Si no hay estado seleccionado, muestra todos los pedidos


    useEffect(() => {
        fetchOrders();
    }, []);


    if (loading) {
        return (
            <>
                <CircularProgress color="inherit" />
            </>
        );
    }

    return (
        <div>
            <Select value={filteredStatus} onChange={handleStatusChange} displayEmpty>
                <MenuItem value="">Todos los estados</MenuItem>
                <MenuItem value="pending">Pendiente</MenuItem>
                <MenuItem value="processing">En proceso</MenuItem>
                <MenuItem value="on-hold">En espera</MenuItem>
                <MenuItem value="completed">Completado</MenuItem>
                <MenuItem value="cancelled">Cancelado</MenuItem>
                <MenuItem value="refunded">Reembolsado</MenuItem>
                <MenuItem value="failed">Fallido</MenuItem>
            </Select>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Ciudad</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Estado</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => {

                            return (
                                <TableRow key={order.id} onClick={() => navigate('/pedidos/' + order.id)}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{new Date(order.date_created).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.shipping.first_name} {order.shipping.last_name}</TableCell>
                                    <TableCell>{order.shipping.city}</TableCell>

                                    <TableCell>{formatter.format(order.total)}</TableCell>
                                    <TableCell>{translateStatus(order.status)}</TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </TableContainer>
        </div>
    );
};

export default OrdersTable;
