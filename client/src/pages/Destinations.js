import React, { useState, useEffect } from 'react';
import { styled, Typography, Button, Box, Dialog, Tabs, Tab } from '@mui/material';
import { TabPanel } from '../components/TabPanel';
import AddIcon from '@mui/icons-material/Add';

// import Auth from '../utils/auth';
import { Destination } from '../components/Destination';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DESTINATIONS } from '../utils/queries';
import { AddDestinationModal } from '../components/AddDestinationModal';
import { INCREMENT_NEGATIVE_REACTIONS, INCREMENT_NEUTRAL_REACTIONS, INCREMENT_POSITIVE_REACTIONS } from '../utils/mutations';

const Wrapper = styled('div')(({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(3)};
    padding: ${theme.spacing(3, 0)};
`);

export const Destinations = ({ user }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const { loading, error, data, refetch } = useQuery(GET_DESTINATIONS);
    const [incrementPositiveReactions] = useMutation(INCREMENT_POSITIVE_REACTIONS);
    const [incrementNeutralReactions] = useMutation(INCREMENT_NEUTRAL_REACTIONS);
    const [incrementNegativeReactions] = useMutation(INCREMENT_NEGATIVE_REACTIONS);

    const onPositiveReaction = async (stopId) => {
      await incrementPositiveReactions({ variables: { stopId } });
      refetch();
    }

    const onNeutralReaction = async (stopId) => {
      await incrementNeutralReactions({ variables: { stopId } });
      refetch();
    }

    const onNegativeReaction = async (stopId) => {
      await incrementNegativeReactions({ variables: { stopId } });
      refetch();
    }

    if (!data) {
      return null;
    }

  return (
    <div>
        {/* tab container to do either signup or login component */}
        { !!user && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v)} aria-label="basic tabs example">
                    <Tab label="All Destinations" />
                    <Tab label="My Destinations" />
                </Tabs>
            </Box>
        ) }
        <TabPanel value={selectedTab} index={0}>
            <Wrapper>
                { ([...data.destinations].reverse()).map(
                    (destination) => (
                      <Destination
                        key={destination._id}
                        user={user}
                        destination={destination}
                        onPositiveReaction={onPositiveReaction}
                        onNeutralReaction={onNeutralReaction}
                        onNegativeReaction={onNegativeReaction}
                      />
                    )
                ) }
            </Wrapper>
        </TabPanel>
        { !!user && (
          <TabPanel value={selectedTab} index={1}>
              <Wrapper>
                  <AddDestinationModal onSave={() => refetch()} />
                  { ([...data.destinations].reverse())
                  .filter((destination) => destination.username === user.username)
                  .map(
                      (destination) => (
                        <Destination
                          key={destination._id}
                          user={user}
                          destination={destination}
                          onPositiveReaction={onPositiveReaction}
                          onNeutralReaction={onNeutralReaction}
                          onNegativeReaction={onNegativeReaction}
                        />
                      )
                  ) }
              </Wrapper>
          </TabPanel>
        ) }
    </div>
  );
};
