import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Toastr from "../components/common/Toastr/Toastr";

export interface AlertMessage {
  title: string;
  description: string;
  content?: string;
  type: AlertType;
  timeout?: number;
}

const StyledErrorIcon = styled(ErrorIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const StyledCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const availableIcons = {
  Error: StyledErrorIcon,
  Success: StyledCheckCircleIcon,
};

export type AlertType = "Error" | "Success";

type AlertFunction = (alert: AlertMessage) => void;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const alertsContext = createContext<AlertFunction>(null!);

export interface AlertsProviderProps {
  onAlert?: (alert: AlertMessage) => void;
  anchorOrigin?: SnackbarOrigin;
  children: React.ReactNode;
}

/**
 * Provide context for notification alerts usage
 * @param anchorOrigin    Screen position to display alerts, bottom-center by default
 * @param onAlert         Callback to be called when a new alert is pushed
 */
export const AlertsProvider: React.FC<AlertsProviderProps> = ({
  children,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  onAlert,
}) => {
  const [canOpen, setCanOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState<AlertMessage | null>(null);
  const [awaitingAlert, setAwaitingAlert] = useState<AlertMessage | null>(null);

  const alertFunction = useCallback(
    (alert: AlertMessage) => {
      setAwaitingAlert(alert);
      if (onAlert) {
        onAlert(alert);
      }
    },
    [setAwaitingAlert, onAlert],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleExit = useCallback(() => {
    setAlert(null);
    setCanOpen(true);
  }, [setCanOpen, setAlert]);

  useEffect(() => {
    if (canOpen && awaitingAlert) {
      setAlert(awaitingAlert);
      setAwaitingAlert(null);
      setIsOpen(true);
      setCanOpen(false);
    }
  }, [
    canOpen,
    awaitingAlert,
    setAlert,
    setAwaitingAlert,
    setIsOpen,
    setCanOpen,
  ]);

  return (
    <>
      <alertsContext.Provider value={alertFunction}>
        {children}
      </alertsContext.Provider>
      {alert && (
        <Toastr
          onClose={handleClose}
          action={
            <Button variant="text" onClick={handleClose}>
              Dismiss
            </Button>
          }
          SnackbarProps={{
            TransitionProps: {
              onExit: handleExit,
            },
            autoHideDuration: alert.timeout || 6000,
          }}
          title={alert.title}
          content={alert.content}
          description={alert.description}
          Icon={availableIcons[alert.type]}
          anchorOrigin={anchorOrigin}
          open={isOpen}
        />
      )}
    </>
  );
};

export const useAlerts = (): AlertFunction => {
  return useContext(alertsContext);
};
