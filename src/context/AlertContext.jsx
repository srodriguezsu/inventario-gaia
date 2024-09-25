import React, { createContext, useContext, useState } from
        'react';
import { Snackbar, Alert } from '@mui/material';

// Create the Alert context
const AlertContext = createContext();

// Hook to use the AlertContext in child components
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};

// AlertContextProvider Component
export const AlertContextProvider = ({children}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');


    const alertMessage = (msg: string, sev: "success" | "error"
        | "info" | "warning") => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AlertContext.Provider value={{ alertMessage }}>
            {children}
            <Snackbar open={open} autoHideDuration={6000}
                      onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};