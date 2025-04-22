import { FunctionComponent, ElementType } from "react";
import styled from "@mui/material/styles/styled";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { useTheme } from "@mui/system";
import CardContent from "@mui/material/CardContent";

const StyledSnackbar = styled(Snackbar)(() => ({
  whiteSpace: "pre-wrap",
  width: "400px",
}));

interface ToastrType {
  isError: boolean;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isError",
})<ToastrType>(({ theme }) => ({
  borderRadius: theme.spacing(1),
  width: "100%",
}));

const StyledCardHeader = styled(CardHeader)(() => ({
  alignItems: "flex-start",
}));

const StyledCardContent = styled(CardContent)(() => ({
  alignItems: "flex-start",
}));

const StyledCardActions = styled(CardActions)(() => ({
  justifyContent: "flex-end",
}));

export interface ToastrProps {
  title: string;
  description: string;
  content?: string;
  Icon?: ElementType<SvgIconProps>;
  open?: boolean;
  onClose?: SnackbarProps["onClose"];
  anchorOrigin?: SnackbarProps["anchorOrigin"];
  action?: SnackbarProps["action"];
  SnackbarProps?: SnackbarProps;
}

const Toastr: FunctionComponent<ToastrProps> = ({
  title,
  description,
  content,
  Icon = CheckCircleIcon,
  open,
  onClose,
  anchorOrigin,
  action,
  SnackbarProps = {},
}) => {
  const theme = useTheme();

  return (
    <StyledSnackbar
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      {...SnackbarProps}
    >
      <StyledCard isError={false}>
        <StyledCardHeader
          titleTypographyProps={{
            variant: "h5",
          }}
          title={title}
          avatar={<Icon />}
          subheader={description}
          subheaderTypographyProps={{
            variant: "body1",
            paddingTop: theme.spacing(1),
          }}
        />
        <StyledCardContent></StyledCardContent>
        {content && <StyledCardContent>{content}</StyledCardContent>}
        {action && <StyledCardActions>{action}</StyledCardActions>}
      </StyledCard>
    </StyledSnackbar>
  );
};

export default Toastr;
