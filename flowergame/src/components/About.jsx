import {Box, Grid, Link, Typography} from "@mui/material";
import Page from "./Page";


function About() {
    return (
        <Page>
            <Grid container className={"about-container"}>
                <Grid item>
                    <Box>
                        <Typography className={"rules-subtitle"}>These are the rules of a game. Let it be played upon an
                            infinite two-dimensional grid of
                            flowers.</Typography>
                        <div className={"rules"}>
                            <Typography>
                                Rule One. A living flower with less than two living neighbors is cut off. It dies.
                            </Typography>
                            <Typography>
                                Rule Two. A living flower with two or three living neighbors is connected. It lives.
                            </Typography>
                            <Typography>
                                Rule Three. A living flower with more than three living neighbors is starved and
                                overcrowded. It dies.
                            </Typography>
                            <Typography>
                                Rule Four. A dead flower with exactly three living neighbors is reborn. It springs back
                                to life.
                            </Typography>
                        </div>

                        <Typography>
                            - The <Link
                            href={"https://www.ishtar-collective.net/entries/the-flower-game"}>Darkness</Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Page>
    );
}

export default About;