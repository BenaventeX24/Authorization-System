import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8000/api',
  documents: 'src/graphql/*',
  generates: {
    'src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
    // './graphql.schema.json': {
    //   plugins: ['introspection'],
    // },
  },
  config: {
    withComponent: false,
    withHOC: false,
    withHooks: true,
  },
};

export default config;
