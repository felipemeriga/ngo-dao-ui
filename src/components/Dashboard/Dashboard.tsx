import * as React from "react";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { CardInfo } from "../common/CardInfo";
import { useVotingPeriod } from "../../hooks/useNGODAO.ts";
import { ethValue } from "../../utils/utils.ts";
import { ProposalsTable } from "../ProposalsTable";
import {
  useNGOBalanceContext,
  useUserDonationsContext,
} from "../../providers/DashboardInfoProvider.tsx";

const ExternalContainer = styled("div")({
  padding: "100px 100px 100px 100px",
  width: "100%",
});

const TableContainer = styled("div")({
  marginTop: "100px",
});

const convertDays = (data: bigint | undefined) => {
  if (data) {
    const secondsInDay = BigInt(3600 * 24);
    return Number(data / secondsInDay);
  }
};

const convertETH = (data: bigint | undefined) => {
  if (data) {
    return ethValue(data);
  }
};

const Dashboard: React.FC = () => {
  return (
    <ExternalContainer>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // Three columns, each taking equal space
          gap: 2,
        }}
      >
        <CardInfo
          title={"Voting Period"}
          description={"day(s)"}
          useInfo={useVotingPeriod}
          convertData={convertDays}
        />
        <CardInfo
          title={"Current NGO Balance"}
          description={"ETH"}
          useInfo={useNGOBalanceContext}
          convertData={convertETH}
        />
        <CardInfo
          title={"Current User Donations"}
          description={"ETH"}
          useInfo={useUserDonationsContext}
          convertData={convertETH}
        />
      </Box>

      <TableContainer>
        <ProposalsTable />
      </TableContainer>
    </ExternalContainer>
  );
};

export default Dashboard;
