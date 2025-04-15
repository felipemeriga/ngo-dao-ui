import * as React from "react";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { CardInfo } from "../common/CardInfo";
import {
  useDonations,
  useTotalDonations,
  useVotingPeriod,
} from "../../hooks/useNGODAO.ts";
import { ethValue } from "../../utils/utils.ts";

export const ExternalContainer = styled("div")({
  padding: "100px 100px 100px 100px",
  width: "100%",
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
          useInfo={useTotalDonations}
          convertData={convertETH}
        />
        <CardInfo
          title={"Current User Donations"}
          description={"ETH"}
          useInfo={useDonations}
          convertData={convertETH}
        />
      </Box>
    </ExternalContainer>
  );
};

export default Dashboard;
