import { builder } from '../builder';
import prisma from '@/lib/prisma';
import { schema } from '../schema';
import { GraphQLObjectType } from 'graphql';

// Function to fetch and sort non-empty fields
async function getNonEmptyObservationHoraireFields(
    numPoste: string,
    startDate: Date,
    endDate: Date,
) {
    console.log('Received Query:', { numPoste, startDate, endDate });

    // Step 1: Fetch all observations for the given station and time period
    const observations = await prisma.observationHoraire.findMany({
        where: { numPoste, dateObservation: { gte: startDate, lte: endDate } },
    });

    if (!observations.length) return [];

    // Step 2: Extract field names and filter out those with only NULL values
    const nonEmptyFields = Object.keys(observations[0]).filter((field) =>
        observations.some((obs) => (obs as Record<string, unknown>)[field] !== null),
    );

    // Step 3: Get GraphQL field descriptions
    const typeMap = schema.getTypeMap();
    const observationType = typeMap['ObservationHoraire'] as GraphQLObjectType;
    const fieldDescriptions = observationType.getFields();

    // Step 4: Map fields to their descriptions
    const mappedFields = nonEmptyFields.map((field) => ({
        field,
        description: fieldDescriptions[field]?.description || null,
    }));

    // Step 5: Sort fields so that quality indicators (q*) appear AFTER their corresponding field
    const regularFields: { field: string; description: string | null }[] = [];
    const qualityIndicators = new Map<string, { field: string; description: string | null }>();

    mappedFields.forEach((item) => {
        if (item.field.startsWith('q')) {
            qualityIndicators.set(item.field.slice(1), item); // Store without "q" prefix
        } else {
            regularFields.push(item);
        }
    });

    // Sort regular fields alphabetically
    regularFields.sort((a, b) => a.field.localeCompare(b.field));

    // Merge quality indicators after their corresponding fields
    const sortedFields: { field: string; description: string | null }[] = [];
    regularFields.forEach((fieldItem) => {
        sortedFields.push(fieldItem);
        const qualityField = qualityIndicators.get(fieldItem.field);
        if (qualityField) {
            sortedFields.push(qualityField);
        }
    });

    // Add remaining quality indicators that didn't match any field
    const remainingQualityFields = [...qualityIndicators.values()].filter(
        (qItem) => !sortedFields.some((item) => item.field === qItem.field),
    );
    sortedFields.push(...remainingQualityFields.sort((a, b) => a.field.localeCompare(b.field)));

    return sortedFields;
}

// Define the GraphQL query field
builder.queryField('getNonEmptyObservationHoraireFields', (t) =>
    t.field({
        type: [
            builder
                .objectRef<{ field: string; description: string | null }>('ObservationField')
                .implement({
                    fields: (t) => ({
                        field: t.exposeString('field'),
                        description: t.exposeString('description', { nullable: true }),
                    }),
                }),
        ],
        args: {
            numPoste: t.arg({ type: 'String', required: true }),
            startDate: t.arg({ type: 'DateTime', required: true }),
            endDate: t.arg({ type: 'DateTime', required: true }),
        },
        resolve: async (_, { numPoste, startDate, endDate }) => {
            return getNonEmptyObservationHoraireFields(numPoste, startDate, endDate);
        },
    }),
);
