import {Divider, Grid, Link, Typography} from "@mui/material";
import React from "react";
import {Link as RouterLink} from "react-router-dom";

function GridSpacer() {
    return (
        <Grid item>
            <Typography>|</Typography>
        </Grid>
    )
}

function Footer() {
    return (
        <div className={"footer"}>
            <Divider variant={"fullWidth"} style={{margin: "1rem"}}/>

            <Grid container direction={"row"} justifyContent={"center"} spacing={2} alignItems={"center"}>
                <Grid item>
                    <RouterLink to={"/about"}>Permalink</RouterLink>
                </Grid>
                <GridSpacer/>
                <Grid item>
                    <RouterLink to={"/about"}>About</RouterLink>
                </Grid>
                <GridSpacer/>
                <Grid item>
                    <Link href="https://github.com/d-costa/flower-game">Source Code</Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Footer;