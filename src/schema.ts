import { gql } from "graphql_tag";

export const typeDefs = gql`
  type CarSchema {
    id: ID!
    plate: String!
    brand: String!
    seats: Int!
  }

  type SellerSchema {
    id: ID!
    name: String!
    dni: String!
    cars: [CarSchema]!
  }

  type ConcessionaireSchema {
    id: ID!
    name: String!
    location: String
  }

  type Query {
    getCars: [CarSchema]!
    getCar(id: ID!): CarSchema
    getSeller(id: ID!): SellerSchema
    getSellers(name: String): [SellerSchema]!
    getConcessionaire(id: ID!): ConcessionaireSchema
    getConcessionaires(name: String!, location: String! ): [ConcessionaireSchema]!
  }
  type Mutation {
      createCar(plate: String!, brand: String!, seats: Int!, price: Float!): CarSchema!
      createSeller(name: String!,dni: String!): SellerSchema!
      createConcessionaire(name: String!, location: String): ConcessionaireSchema!
      addCar(plate: String!, sellerId: ID!): CarSchema!
      addSeller(dni: String!, concessionaireId:ID!): SellerSchema!
    }
`;


