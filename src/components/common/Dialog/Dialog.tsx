import React from 'react';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { Breakpoint } from '@mui/material';

interface DialogProps {
  open: boolean;
  title?: React.ReactElement;
  actions?: React.ReactElement;
  onClose?: () => void;
  children: React.ReactElement;
  maxWidth?: Breakpoint | false;
  fullWidth?: boolean;
}

const DialogContentWrapper = styled(DialogContent)(({ theme }) => ({
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
}));

const ActionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  gap: theme.spacing(0.5),
}));

const StyledDialogTitle = styled(DialogTitle)(() => ({
  padding: '8px 24px',
}));

const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  actions,
  onClose,
  children,
  maxWidth,
  fullWidth,
}) => {
  return (
    <MuiDialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      <Fade in={open} timeout={400}>
        <div>
          {title && (
            <div>
              <StyledDialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>{title}</Box>
                  {onClose && (
                    <Box>
                      <IconButton onClick={onClose} size="small" data-testid="btn-dialog-onclose">
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </StyledDialogTitle>
              <Divider />
            </div>
          )}
          <DialogContentWrapper>{children}</DialogContentWrapper>
          {actions && (
            <>
              <Divider />
              <ActionWrapper>
                <StyledDialogActions>{actions}</StyledDialogActions>
              </ActionWrapper>
            </>
          )}
        </div>
      </Fade>
    </MuiDialog>
  );
};

export default React.memo(Dialog);
