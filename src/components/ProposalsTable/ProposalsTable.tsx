import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useProposals } from "../../hooks/useNGODAO.ts";
import { LoadingContainer } from "../common/Loading/Loading.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import { ethValue, formatDeadline } from "../../utils/utils.ts";
import { Status } from "./Status";
import EtherScanLink from "../common/EtherScanLink/EtherScanLink.tsx";

const ProposalsTable: React.FC = () => {
  const { data, isLoading, error } = useProposals();
  return (
    <>
      {isLoading || error ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
              "& .MuiTableCell-root": { fontSize: "1.2rem" }, // Increase font size for all table cells
              "& .MuiTableHead-root .MuiTableCell-root": { fontWeight: "bold" }, // Make headers bold
            }}
            aria-label="simple table"
          >
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
                  <TableRow
                    onClick={(event) => {
                      console.log(event);
                    }}
                    // onMouseOver={(e) =>
                    //   (e.currentTarget.style.backgroundColor =
                    //     "rgb(228,228,197)")
                    // }
                    // onMouseOut={(e) =>
                    //   (e.currentTarget.style.backgroundColor = "")
                    // }
                    key={row.title}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "rgb(228,228,197)", // Or any color you prefer
                        cursor: "pointer", // Add this if you want to show pointer on hover
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{ethValue(row.value)}</TableCell>
                    <TableCell align="center">
                      <EtherScanLink
                        showAddress={true}
                        walletAddress={row.target}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {formatDeadline(row.deadline)}
                    </TableCell>
                    <TableCell align="center">{Number(row.yesVotes)}</TableCell>
                    <TableCell align="center">{Number(row.noVotes)}</TableCell>
                    <TableCell align="center">
                      <Status
                        noVotes={Number(row.noVotes)}
                        yesVotes={Number(row.yesVotes)}
                        executed={row.executed}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ProposalsTable;
