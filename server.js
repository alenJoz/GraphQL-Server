const express = require("express");
const cors = require('cors');
const app = express();

const { makeExecutableSchema } = require("graphql-tools");
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express")

const typeDefs = `
  type Student {
    id: ID!
    email: String
    firstName: String
    lastName: String
  }

  type Query {
    students: [Student]
  }
`;

const studentsArr = [
        {
            "id": "S1001",
            "email": "mohtasim@sample.org",
            "firstName": "Mohtashim",
            "lastName": "Mohammad"
        },
        {
            "id": "S1002",
            "email": "kannan@sample.org",
            "firstName": "Kannan",
            "lastName": "Sudhakaran"
        },
        {
            "id": "S1003",
            "email": "kiran@sample.org",
            "firstName": "Kiran",
            "lastName": "john"
        },
        {
            "id": "S1004",
            "email": "kiran@sample.org",
            "firstName": "Tim",
            "lastName": "George"
        }
    ]

const resolverObj = {
    Query: {
        students: () => studentsArr,
      },
}

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolverObj
});

app.use(cors());

app.use(express.json());

app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(4000, () => {
    console.log("Server started")
})