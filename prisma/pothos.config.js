/** @type {import('prisma-generator-pothos-codegen').Config} */
module.exports = {
    inputs: {
        outputFilePath: 'src/graphql/generated/inputs.ts',
    },
    crud: {
        outputDir: 'src/graphql/generated/',
        inputsImporter: `import * as Inputs from '@/graphql/generated/inputs';`,
        resolverImports: `import prisma from '@/lib/prisma';`,
        prismaCaller: 'prisma',
        excludeMutations: true,
        deleteOutputDirBeforeGenerate: true,
    },
    global: {
        builderLocation: 'src/graphql/builder',
    },
};
