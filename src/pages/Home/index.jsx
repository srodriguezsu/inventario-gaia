import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {getRole} from "../../cookiesUtilities";

const Home = () => {
    const [loginStatus, setLoginStatus] = useState(null);

    // Use useEffect to ensure cookies are read only on the client side
    useEffect(() => {
        const role = getRole();
        setLoginStatus(role);
    }, []);
    return (
        <>
            <Typography variant="h1">Inicio</Typography>
            <Typography>Hola {loginStatus}</Typography>

        </>
    );
};

export default Home;