// import the gql tagged template function

const { gql } = require ('apollo-server-express');

// create our typeDefs

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    destinations: [Destination]
  }

  type Destination {
    _id: ID
    destinationTitle: String
    destinationText: String
    destinationImgUrl: String
    destinationLocUrl: String
    username: String
    stops: [Stop]
  }

  type Stop {
    _id: ID
    stopTitle: String
    stopText: String
    stopImgUrl: String
    username: String
    numPositiveReactions: Int
    numNegativeReactions: Int
    numNeutralReactions: Int
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    destinations(username: String): [Destination]
    destination(_id: ID!): Destination
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addDestination(destinationTitle: String!, destinationText: String!, destinationImgUrl: String!, destinationLocUrl: String!): Destination
    addStop(destinationId: ID!, stopTitle: String!, stopText: String!, stopImgUrl: String!): Stop
    addPositiveReaction(destinationId: ID!, stopId: ID!): Stop
    addNegativeReaction(destinationId: ID!, stopId: ID!): Stop
    addNeutralReaction(destinationId: ID!, stopId: ID!): Stop
  }
`;

// export te typeDefs
module.exports = typeDefs;

