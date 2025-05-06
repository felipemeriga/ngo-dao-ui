/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useCallback, useState } from "react";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styled from "@mui/material/styles/styled";
import Toastr from "../components/common/Toastr/Toastr";

// Styled components
const StyledErrorIcon = styled(ErrorIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const StyledCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
  color: theme.palette.success.main,
}));

// Types
export type AlertType = "Error" | "Success";

export interface AlertMessage {
  title: string;
  description: string;
  content?: React.ReactNode;
  type: AlertType;
  timeout?: number;
}

interface Alert extends AlertMessage {
  id: string;
  shown: boolean;
}

type AlertFunction = (alert: AlertMessage) => void;

// Context
const alertsContext = createContext<AlertFunction>(null!);

// Provider Props
export interface AlertsProviderProps {
  children: React.ReactNode;
  onAlert?: (alert: AlertMessage) => void;
  anchorOrigin?: SnackbarOrigin;
}

const DEFAULT_TIMEOUT = 6000;

export const AlertsProvider: React.FC<AlertsProviderProps> = ({
  children,
  onAlert,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const showAlert = useCallback(
    (alertMessage: AlertMessage) => {
      const newAlert: Alert = {
        ...alertMessage,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        shown: true,
      };

      setAlerts((prev) => [...prev, newAlert]);
      if (onAlert) {
        onAlert(alertMessage);
      }
    },
    [onAlert],
  );

  const handleClose = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, shown: false } : alert,
      ),
    );
  }, []);

  const icons = {
    Error: StyledErrorIcon,
    Success: StyledCheckCircleIcon,
  };

  return (
    <alertsContext.Provider value={showAlert}>
      {children}
      {alerts.map((alert) => (
        <Toastr
          key={alert.id}
          open={alert.shown}
          onClose={() => handleClose(alert.id)}
          title={alert.title}
          description={alert.description}
          content={alert.content}
          Icon={icons[alert.type]}
          anchorOrigin={anchorOrigin}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => handleClose(alert.id)}
            >
              Dismiss
            </Button>
          }
          SnackbarProps={{
            TransitionProps: {
              onExited: () => removeAlert(alert.id),
            },
            autoHideDuration: alert.timeout || DEFAULT_TIMEOUT,
          }}
        />
      ))}
    </alertsContext.Provider>
  );
};

export const useAlerts = (): AlertFunction => {
  return useContext(alertsContext);
};
