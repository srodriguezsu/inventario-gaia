import React from 'react';
import {Box, Button, Icon} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Index = ({children}) => {
    const navigate = useNavigate()
    return (
        <Box sx={{display:"flex"}}>
            <Box>
                <Button onClick={()=>navigate(-1)}>
                    <Icon>
                        arrow_back
                    </Icon>
                </Button>

            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default Index;