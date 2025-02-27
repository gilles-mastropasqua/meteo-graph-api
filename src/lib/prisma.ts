import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_PRISMA_TAKE = Number(process.env.DEFAULT_PRISMA_TAKE) || 10;

const applyDefaultTake = <T, A extends Prisma.Args<T, 'findMany' | 'findUnique' | 'findFirst'>>({ args, query }: {
    args: A;
    query: (args: A) => Promise<Prisma.Result<T, A, 'findMany' | 'findUnique' | 'findFirst'>>
}) => {
    if (!args.take && 'take' in args) {
        args.take = DEFAULT_PRISMA_TAKE;
    }

    ['include', 'select'].forEach((key) => {
        if (args[key] && typeof args[key] === 'object') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Object.values(args[key]).forEach((relation: any) => {
                if (typeof relation === 'object' && !relation.take) {
                    relation.take = DEFAULT_PRISMA_TAKE;
                }
            });
        }
    });

    return query(args);
};

export const extendedPrisma = prisma.$extends({
    query: {
        $allModels: {
            findMany: applyDefaultTake,
            findUnique: applyDefaultTake,
            findFirst: applyDefaultTake,
        },
    },
});

export default extendedPrisma;
