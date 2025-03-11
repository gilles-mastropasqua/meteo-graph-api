import { builder } from './builder';
import { generateAllObjects, generateAllQueries } from './generated/autocrud';
import './resolvers/getNonEmptyObservationHoraireFields';


generateAllObjects();
generateAllQueries();


builder.queryType({});

export const schema = builder.toSchema({});
