import React, {useEffect, useState} from 'react';
import {CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {WooCommerce} from "../../API";
import {useAlert} from "../../context/AlertContext";

const CustomersTable = () => {
    const { alertMessage } = useAlert();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch WooCommerce customers
    const fetchCustomers = async () => {

        WooCommerce.get("customers")
            .then((response) => {
                setCustomers(response.data);
                alertMessage("Lista actualizada con éxito", "success")
            })
            .catch((error) => {

                alertMessage(error.response?.data.message || "Error fetching customers", "error");
            })
            .then(()=>{
                setLoading(false)
            })

    };

    useEffect(() => {

        fetchCustomers().then();

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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>


                        {customers.map((customer) => {

                            const name = customer?.first_name;
                            const last_name = customer?.last_name;
                            return (
                                <TableRow key={customer.id} onClick={() => navigate('/clientes/' + customer.id)}>
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell>{name} {last_name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </TableContainer>
        </div>
    );
};

export default CustomersTable;