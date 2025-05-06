import React from "react";
import { FormGroupContent, FormWrapper } from "../common/Form/styles.tsx";
import { Proposal } from "../../types/types.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ethValue } from "../../utils/utils.ts";
import EtherScanLink from "../common/EtherScanLink/EtherScanLink.tsx";
import { Status } from "../ProposalsTable/Status";
import { Deadline } from "../common/Deadline";

export interface ProposalProps {
  proposal: Proposal | null;
}

const ProposalInfo: React.FC<ProposalProps> = ({ proposal }) => {
  return (
    <>
      {proposal && (
        <FormWrapper>
          <FormGroupContent display="flex">
            <Box
              sx={{
                width: "100%",
                display: "grid",
              }}
            >
              <h2>Description</h2>
              <Typography>{proposal.description as string}</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // Three columns, each taking equal space
                gap: 2,
              }}
            >
              <div>
                <h2>Value</h2>
                <Typography>{ethValue(proposal.value)} ETH</Typography>
              </div>
              <div>
                <h2>Target</h2>
                <EtherScanLink
                  showAddress={true}
                  walletAddress={proposal.target as string}
                />
              </div>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", // Three columns, each taking equal space
                gap: 2,
              }}
            >
              <div>
                <h2>Deadline</h2>
                <Deadline deadline={proposal.deadline} />
              </div>
              <div>
                <h2>Status</h2>
                <Status
                  noVotes={Number(proposal.noVotes)}
                  yesVotes={Number(proposal.yesVotes)}
                  executed={proposal.executed}
                />
              </div>
              <div>
                <h2>Yes Votes</h2>
                <Typography>{proposal.yesVotes}</Typography>
              </div>
              <div>
                <h2>No Votes</h2>
                <Typography>{proposal.noVotes}</Typography>
              </div>
            </Box>
          </FormGroupContent>
        </FormWrapper>
      )}
    </>
  );
};

export default ProposalInfo;
