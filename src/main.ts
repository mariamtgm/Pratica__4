import { Server } from "std/http/server.ts";
import { GraphQLHTTP } from "gql";
import { makeExecutableSchema } from "graphql_tools";

import { Query} from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./schema.ts";

const resolvers = {
  Query,
  Mutation,
};


const getPort = () => {
  const port = Deno.env.get("PORT");

  if (port) {
    return parseInt(port)
  }

  return 7777
}


const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP<Request>({
          schema: makeExecutableSchema({ resolvers, typeDefs }),
          graphiql: true,
        })(req)
      : new Response("Not Found", { status: 404 });
  },
  port: getPort(),
});

console.log(`listening to port: ${getPort()}`)
server.listenAndServe();
