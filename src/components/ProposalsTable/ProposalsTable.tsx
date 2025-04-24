import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LoadingContainer } from "../common/Loading/Loading.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import { ethValue } from "../../utils/utils.ts";
import { Status } from "./Status";
import EtherScanLink from "../common/EtherScanLink/EtherScanLink.tsx";
import styled from "@mui/material/styles/styled";
import { useProposalsContext } from "../../providers/ProposalsProvider.tsx";
import { useProposalInfo } from "../ProposalInfo/hooks/useProposalInfo.ts";
import { Dialog } from "../common/Dialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ProposalInfo } from "../ProposalInfo";
import { Deadline } from "../common/Deadline";
export const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": { border: 0 },
  "&:hover": {
    backgroundColor: "rgb(228,228,197)", // Or any color you prefer
    cursor: "pointer", // Add this if you want to show pointer on hover
  },
}));

export const StyledTable = styled(Table)(() => ({
  minWidth: 650,
  "& .MuiTableCell-root": { fontSize: "1.2rem" }, // Increase font size for all table cells
  "& .MuiTableHead-root .MuiTableCell-root": { fontWeight: "bold" }, // Make headers bold
}));

const ProposalsTable: React.FC = () => {
  const { isLoading, error, data } = useProposalsContext();
  const {
    proposal,
    closeProposalInfoDialog,
    setSelectedProposal,
    isProposalInfoDialogOpened,
    openProposalInfolDialog,
  } = useProposalInfo();

  return (
    <>
      {isLoading || error ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <>
          <TableContainer component={Paper}>
            <StyledTable aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="center">Value&nbsp;(ETH)</TableCell>
                  <TableCell align="center">Target</TableCell>
                  <TableCell align="center">Deadline</TableCell>
                  <TableCell align="center">Yes Votes</TableCell>
                  <TableCell align="center">No Votes</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row) => (
                    <StyledTableRow
                      onClick={() => {
                        setSelectedProposal(row);
                        openProposalInfolDialog();
                      }}
                      key={row.title}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="center">
                        {ethValue(row.value)}
                      </TableCell>
                      <TableCell align="center">
                        <EtherScanLink
                          showAddress={true}
                          walletAddress={row.target}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Deadline deadline={row.deadline} />
                      </TableCell>
                      <TableCell align="center">
                        {Number(row.yesVotes)}
                      </TableCell>
                      <TableCell align="center">
                        {Number(row.noVotes)}
                      </TableCell>
                      <TableCell align="center">
                        <Status
                          noVotes={Number(row.noVotes)}
                          yesVotes={Number(row.yesVotes)}
                          executed={row.executed}
                        />
                      </TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
          {isProposalInfoDialogOpened && (
            <Dialog
              open={isProposalInfoDialogOpened}
              fullWidth
              maxWidth="xl"
              onClose={() => {
                closeProposalInfoDialog();
              }}
              title={<Typography variant="h4">{proposal?.title}</Typography>}
              // statusMessage={
              //   <>
              //     {createProposalForm.formResults.isConfirming && (
              //       <Typography variant="body1">
              //         Creating proposal...
              //       </Typography>
              //     )}
              //   </>
              // }
              actions={
                <>
                  <Button
                    id="proposal-info-cancel"
                    onClick={() => {
                      closeProposalInfoDialog();
                    }}
                    variant="text"
                    color="inherit"
                  >
                    Cancel
                  </Button>

                  {/*<ProgressButton*/}
                  {/*  id="create-multiview-listing-confirm"*/}
                  {/*  isLoading={*/}
                  {/*    createProposalForm.formResults.isLoading || false*/}
                  {/*  }*/}
                  {/*  disabled={createProposalForm.formResults.isLoading}*/}
                  {/*  onClick={() => {*/}
                  {/*    createProposalForm.handleSubmit();*/}
                  {/*  }}*/}
                  {/*  variant="contained"*/}
                  {/*  color="primary"*/}
                  {/*>*/}
                  {/*  Create*/}
                  {/*</ProgressButton>*/}
                </>
              }
            >
              <form>
                <ProposalInfo proposal={proposal} />
              </form>
            </Dialog>
          )}
        </>
      )}
    </>
  );
};

export default ProposalsTable;
