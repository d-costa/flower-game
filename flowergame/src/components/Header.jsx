import {Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';


function Header() {
    let navigate = useNavigate();

    return (
        <div className={"header"} onClick={() => {navigate("/"); navigate(0);}}>
            <Typography className={"header-title"} fontSize={"2rem"}>The Flower Game</Typography>
        </div>
    )
}

export default Header;