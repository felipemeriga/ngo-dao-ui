import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FormProvider } from "react-hook-form";
import MenuIcon from "@mui/icons-material/Menu";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDisconnect, useAccount } from "wagmi";
import { Address } from "../common/Address";
import { useHeaderNavigation } from "../../hooks/useHeaderNavigation.ts";
import CreateProposalFormContent from "../CreateProposalFormContent/CreateProposalFormContent.tsx";
import { Dialog } from "../common/Dialog";
import { ProgressButton } from "../common/ProgressButton";
import { DonateFormContent } from "../DonateFormContent";

const Header: React.FC = () => {
  const { createProposalForm, donateForm } = useHeaderNavigation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateProposal = () => {
    if (!createProposalForm.isCreateProposalDialogOpened) {
      createProposalForm.openCreateProposalDialog();
    }

    handleClose();
  };

  const handleDonate = () => {
    if (!donateForm.isDonateDialogOpened) {
      donateForm.openDonateDialog();
    }

    handleClose();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleCreateProposal}>
                Create Proposal
              </MenuItem>
              <MenuItem onClick={handleDonate}>Donate</MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NGO DAO - Dashboard
            </Typography>
            <>
              {isConnected ? (
                <Box sx={{ display: { md: "flex" }, gap: 5 }}>
                  <Address address={address} />
                  <Button color="inherit" onClick={() => disconnect()}>
                    Disconnect
                  </Button>
                </Box>
              ) : null}
            </>
          </Toolbar>
        </AppBar>
        {/* Spacer to offset the fixed AppBar */}
        <Toolbar />
      </Box>
      {createProposalForm.isCreateProposalDialogOpened && (
        <FormProvider {...createProposalForm.form.formMethods}>
          <Dialog
            open={createProposalForm.isCreateProposalDialogOpened}
            fullWidth
            maxWidth="xl"
            onClose={() => {
              createProposalForm.closeCreateProposalDialog();
            }}
            title={<Typography variant="h4">Create Proposal</Typography>}
            statusMessage={
              <>
                {createProposalForm.form.formResults.isConfirming && (
                  <Typography variant="body1">Creating proposal...</Typography>
                )}
              </>
            }
            actions={
              <>
                <Button
                  id="create-proposal-cancel"
                  onClick={() => {
                    createProposalForm.closeCreateProposalDialog();
                  }}
                  variant="text"
                  color="inherit"
                >
                  Cancel
                </Button>

                <ProgressButton
                  id="create-proposal-confirm"
                  isLoading={
                    createProposalForm.form.formResults.isLoading || false
                  }
                  disabled={createProposalForm.form.formResults.isLoading}
                  onClick={() => {
                    createProposalForm.form.handleSubmit();
                  }}
                  variant="contained"
                  color="primary"
                >
                  Create
                </ProgressButton>
              </>
            }
          >
            <form>
              <CreateProposalFormContent />
            </form>
          </Dialog>
        </FormProvider>
      )}
      {donateForm.isDonateDialogOpened && (
        <FormProvider {...donateForm.form.formMethods}>
          <Dialog
            open={donateForm.isDonateDialogOpened}
            fullWidth
            maxWidth="xl"
            onClose={() => {
              donateForm.closeDonateDialog();
            }}
            title={<Typography variant="h4">Donate to NGO</Typography>}
            statusMessage={
              <>
                {donateForm.form.formResults.isConfirming && (
                  <Typography variant="body1">Donating...</Typography>
                )}
              </>
            }
            actions={
              <>
                <Button
                  id="donate-cancel"
                  onClick={() => {
                    donateForm.closeDonateDialog();
                  }}
                  variant="text"
                  color="inherit"
                >
                  Cancel
                </Button>

                <ProgressButton
                  id="donate-confirm"
                  isLoading={donateForm.form.formResults.isLoading || false}
                  disabled={donateForm.form.formResults.isLoading}
                  onClick={() => {
                    donateForm.form.handleSubmit();
                  }}
                  variant="contained"
                  color="primary"
                >
                  Donate
                </ProgressButton>
              </>
            }
          >
            <form>
              <DonateFormContent />
            </form>
          </Dialog>
        </FormProvider>
      )}
    </>
  );
};

export default Header;
