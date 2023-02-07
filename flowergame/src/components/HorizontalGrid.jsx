import { Grid } from "@mui/material";

function HorizontalGrid(props) {
  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"center"}
      spacing={2}
      alignItems={"center"}
    >
      {props.children.map((c) => (
        <Grid item key={c.key}>{c}</Grid>
      ))}
    </Grid>
  );
}

export default HorizontalGrid;
