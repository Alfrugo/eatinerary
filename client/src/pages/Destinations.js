import React, { useState, useEffect } from 'react';
import { styled, Typography, Button, Box, Dialog, Tabs, Tab } from '@mui/material';
import { TabPanel } from '../components/TabPanel';

// import Auth from '../utils/auth';
import { Destination } from '../components/Destination';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DESTINATIONS } from '../utils/queries';

const Wrapper = styled('div')(({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2)};
    padding: ${theme.spacing(2, 0)};
`);

export const Destinations = ({ user }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const { loading, error, data } = useQuery(GET_DESTINATIONS);

    console.log(data);

  if (loading) {
      return (
          <div>
              loading...
          </div>
      )
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
                { data.destinations.map(
                    (destination) => <Destination key={destination._id} destination={destination} />
                ) }
            </Wrapper>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
            
        </TabPanel>
    </div>
  );
};
