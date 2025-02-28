import Fastify from 'fastify';
import { createYoga } from 'graphql-yoga';
import { schema } from '@/graphql/schema';

const server = Fastify({
    // logger: true,
});

const yoga = createYoga({
    schema,
    graphqlEndpoint: '/',
    graphiql: {
        title: 'MeteoGraph GraphQL API',
        defaultQuery: `
# Welcome to the MeteoGraph GraphQL API!
#
# This API provides access to meteorological data from Météo-France observation stations.
#
# Available Features:
# - Get station metadata, including location, altitude, and operational status.
# - Query historical hourly weather data for specific dates and locations.
#
# Example Query:

{
  countObservationHoraire
  countPoste
  findUniquePoste(where: {numPoste: "10099002"}) {
    numPoste
    nomUsuel
    posteOuvert
    observations(
      take: 30
      orderBy: {dateObservation: desc}
      where: {dateObservation: {gte: "2025-02-24T22:00:00.000Z", lte: "2025-02-25T22:00:00.000Z"}}
    ) {
      numPoste
      dateObservation
      alti
      t
    }
  }
}

# Use the "Docs" panel on the left to explore available types.
# For more details, visit the official dataset documentation.
# https://meteo.data.gouv.fr/datasets/6569b4473bedf2e7abad3b72
# or 
# https://github.com/gilles-mastropasqua/meteo-graph-api
    `,
    },
});

server.route({
    url: '/',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {

        const response = await yoga.handleNodeRequest(req, reply, {
            req,
            reply,
        });

        response.headers.forEach((value, key) => {
            reply.header(key, value);
        });

        reply.status(response.status);

        reply.send(response.body);

        return reply;
    },
});

server.listen({ port: 4000, host: '0.0.0.0' }, () => {
    console.log('🚀 GraphQL API ready at http://0.0.0.0:4000');
});
