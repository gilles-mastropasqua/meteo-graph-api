import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { PrismaClient } from "@prisma/client";
import PrismaTypes from "@pothos/plugin-prisma/generated";

const prisma = new PrismaClient();

export const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
    Scalars: {
        DateTime: {
            Input: Date;
            Output: string;
        };
    };
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma,
        exposeDescriptions: true,
        filterConnectionTotalCount: true,
    }
});
