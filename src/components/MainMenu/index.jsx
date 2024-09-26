import React, {useEffect, useState} from 'react';
import {useAlert} from "../../context/AlertContext";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {
    Box,
    Container, CssBaseline,
    Divider, Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import {getRole} from "../../cookiesUtilities";
const drawerWidth = 240;



const MainMenu = ({children}) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const navigate = useNavigate();
    const { alertMessage } = useAlert();

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };





    const handleLogout = () => {
        try {

            alertMessage("Cerraste sesión", 'warning');
            navigate('/login');
            Cookies.remove('loginStatus');
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {[{name: 'Inicio', slug: '/'}, {name: 'Insumos', slug: '/inventario'},{name: 'Pedidos', slug: '/pedidos'}, {name: 'Productos', slug:'/productos'}, {name: 'Clientes', slug:'/clientes'}].map((item:{name:string, slug:string}) => (
                    <ListItem key={item.name} disablePadding onClick={()=>navigate(item.slug)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {/*{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem key={'Cerrar sesión'} disablePadding onClick={handleLogout}>
                    <ListItemButton>
                        <ListItemIcon>
                            {/*{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                        </ListItemIcon>
                        <ListItemText primary={'Cerrar sesión'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    useEffect(() => {

        const loginStatus = getRole();
        if (!loginStatus) {
            navigate('/login');
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }

    }, [navigate]);

    if (!isLoggedIn){
        return (children)
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}

                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,  },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >

                <Container>
                    {children}
                </Container>



            </Box>
        </Box>
    );
};

export default MainMenu;