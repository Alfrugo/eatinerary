import React, { useState, useEffect } from 'react';

// import Auth from '../utils/auth';
import { useQuery, useMutation  } from '@apollo/client';
import { GET_DESTINATIONS } from '../utils/queries';

export const Destinations = () => {
  const { loading, error, data } = useQuery(GET_DESTINATIONS);

  if (loading) {
      return (
          <div>
              loading...
          </div>
      )
  }

  return (
    <div>
        { data.destinations.map((destination) => {
            return (
                <div key={destination._id}>{destination.destinationTitle}</div>
            )
        }) }
    </div>
  );
};
