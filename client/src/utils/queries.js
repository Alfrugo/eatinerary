import { gql } from '@apollo/client';

export const GET_DESTINATIONS = gql`
    query destinations {
        destinations {
            destinationTitle
            _id
            destinationText
            destinationImgUrl
            destinationLocUrl
            username
            stops {
                _id
                stopTitle
                stopText
                stopImgUrl
                username
                numPositiveReactions
                numNegativeReactions
                numNeutralReactions
            }
        }
    }
`;
