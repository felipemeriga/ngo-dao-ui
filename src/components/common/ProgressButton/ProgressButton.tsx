import React from "react";
import styled from "@mui/material/styles/styled";
import Button, { ButtonProps } from "@mui/material/Button";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

const Wrapper = styled("div")({
  position: "relative",
});

const StyledCircularProgress = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: -12,
  marginLeft: -12,
});

const StyledLinearProgress = styled(LinearProgress)({
  marginTop: -4,
  opacity: 0.6,
});

/**
 * Progress button component props
 */
export interface ProgressButtonProps extends ButtonProps {
  isLoading: boolean;
  linearProgressProps?: LinearProgressProps;
  circularProgressProps?: CircularProgressProps;
  useCircularLoading?: boolean;
}

/**
 * Progress button to show some feedback when a process is loading
 */
const ProgressButton: React.FC<ProgressButtonProps> = ({
  isLoading,
  linearProgressProps,
  circularProgressProps,
  useCircularLoading = true,
  children,
  variant,
  ...buttonProps
}) => {
  return (
    <Wrapper>
      <Button variant={variant} {...buttonProps}>
        {children}
      </Button>
      {isLoading && !useCircularLoading && (
        <StyledLinearProgress
          color={buttonProps.color}
          {...linearProgressProps}
        />
      )}
      {isLoading && useCircularLoading && (
        <StyledCircularProgress
          size={24}
          color={buttonProps.color}
          {...circularProgressProps}
        />
      )}
    </Wrapper>
  );
};

export default React.memo(ProgressButton);
