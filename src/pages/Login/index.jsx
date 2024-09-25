import React, {useState} from 'react';
import {useAlert} from "../../context/AlertContext";
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

const socio ={
    username: 'socio',
    password: '1234',
};

const trabajador = {
    username: 'trabajador',
    password: '4321',
}


const Login = () => {
    const router = useNavigate();
    const { alertMessage } = useAlert();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleInput = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            [e.target.id]: e.target.value
        }));
    };

    const onLogin = () => {
        if (user.username === trabajador.username && user.password === trabajador.password) {
            alertMessage("Iniciaste sesión como trabajador", "success");
            Cookies.set('loginStatus', 'trabajador', { expires: 7 });
            router('/'); // Redirect to home
        } else if (user.username === socio.username && user.password === socio.password) {
            alertMessage("Iniciaste sesión como socio", "success");
            Cookies.set('loginStatus', 'socio', { expires: 7 });
            router('/')
        } else {
            alertMessage("Inicio de sesión fallido", "error");
        }
    };

    return (
        <Stack sx={{height: '100vh', width:'100%', backgroundColor: "secondary.main"}}>
            <Stack spacing={4} sx={{alignItems: 'center', margin:"10%"}}>
                <Typography variant="h1">Inventario GAIA</Typography>
                <Typography variant="h2">Iniciar Sesión</Typography>
                <TextField id="username"
                           label="Usuario"
                           variant="standard"
                           value={user.username}
                           onChange={handleInput}
                />
                <TextField id="password"
                           label="Contraseña"
                           variant="standard"
                           value={user.password}
                           onChange={handleInput}
                           type="password"
                />
                <Button variant="contained" onClick={onLogin}>
                    Ingresar
                </Button>
            </Stack>
        </Stack>

    );
};

export default Login;