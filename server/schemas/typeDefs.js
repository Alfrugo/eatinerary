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
    desinationLocUrl: String
    username: String
    stops: [Stop]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Stop {
    _id: ID
    stopTitle: String
    stopText: String
    stopImgUrl: String
    stopReaction: String
    username: String
    createdAt: Int
    reactionCount: Int
    reactions: [Reaction]
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
    addDestination(destinationTitle: String!): Destination
    addStop(stopTitle: String!): Stop
    addReaction(stopId: ID!, reactionBody: String!): Stop
    addFriend(friendId: ID!): User
  }
`;

// export te typeDefs
module.exports = typeDefs;

