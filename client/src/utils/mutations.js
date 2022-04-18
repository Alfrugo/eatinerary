import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const ADD_DESTINATION = gql`
  mutation addDestination($destinationTitle: String!, $destinationText: String!, $destinationImgUrl: String!, $destinationLocUrl: String!) {
    addDestination(destinationTitle: $destinationTitle, destinationText: $destinationText, destinationImgUrl: $destinationImgUrl, destinationLocUrl: $destinationLocUrl) {
      _id
      destinationTitle
      destinationText
      destinationImgUrl
      destinationLocUrl
      username
    }
  }
`;

export const ADD_STOP = gql`
  mutation Mutation($destinationId: ID!, $stopTitle: String!, $stopText: String!, $stopImgUrl: String!) {
    addStop(destinationId: $destinationId, stopTitle: $stopTitle, stopText: $stopText, stopImgUrl: $stopImgUrl) {
      _id
      stopTitle
      stopImgUrl
      stopText
      username
    }
  }
`;

export const INCREMENT_POSITIVE_REACTIONS = gql`
  mutation Mutation($stopId: ID!) {
    addPositiveReaction(stopId: $stopId) {
      _id
      destinationTitle
      stops {
        _id
        stopTitle
        numPositiveReactions
        numNegativeReactions
        numNeutralReactions
        stopText
        stopImgUrl
        username
      }
      destinationText
      destinationImgUrl
      destinationLocUrl
      username
    }
  }
`;

export const INCREMENT_NEUTRAL_REACTIONS = gql`
  mutation Mutation($stopId: ID!) {
    addNeutralReaction(stopId: $stopId) {
      _id
      destinationTitle
      stops {
        _id
        stopTitle
        numPositiveReactions
        numNegativeReactions
        numNeutralReactions
        stopText
        stopImgUrl
        username
      }
      destinationText
      destinationImgUrl
      destinationLocUrl
      username
    }
  }
`;

export const INCREMENT_NEGATIVE_REACTIONS = gql`
  mutation Mutation($stopId: ID!) {
    addNegativeReaction(stopId: $stopId) {
      _id
      destinationTitle
      stops {
        _id
        stopTitle
        numPositiveReactions
        numNegativeReactions
        numNeutralReactions
        stopText
        stopImgUrl
        username
      }
      destinationText
      destinationImgUrl
      destinationLocUrl
      username
    }
  }
`;
