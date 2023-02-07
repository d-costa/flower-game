import { Divider } from "@mui/material";

function CustomDivider(props) {
  return (
    <div className={"divider"}>
      <Divider variant={"fullWidth"} style={{ margin: "1rem" }} />
    </div>
  );
}

export default CustomDivider;
