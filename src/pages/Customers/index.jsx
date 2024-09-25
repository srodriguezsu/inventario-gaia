
import { Typography} from "@mui/material";

import CustomersTable from "./CustomersTable";


const Customers = () => {

    return (
        <>
            <Typography variant="h1">Clientes</Typography>
            <CustomersTable/>
        </>
    );
};

export default Customers;