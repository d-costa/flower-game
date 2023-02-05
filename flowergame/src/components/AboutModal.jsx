import {Box, Button, Link, Modal, Typography} from "@mui/material";
import React from "react";

function AboutModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            The Flower Game
                        </Typography>
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
                </div>
            </Modal>
        </div>
    );
}

export default AboutModal;
