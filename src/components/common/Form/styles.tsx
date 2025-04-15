import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

export const FormWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export const FormGroupContent = styled(Box)<{ display?: string }>(
  ({ theme, display }) => ({
    display: display || "block",
    flexWrap: "wrap",
    padding: theme.spacing(1),

    "& > *": {
      marginBottom: theme.spacing(1),
    },
  }),
);

export const InlineField = styled("div")<{ cols?: number }>(
  ({ theme, cols = 4 }) => ({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: `calc(${100 / cols}% - 16px)`,
    whiteSpace: "break-spaces",
    wordBreak: "break-all",

    "& > div": {
      width: "100%",
    },
  }),
);

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
