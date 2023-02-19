import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8000/api',
  documents: 'src/graphql/*',
  generates: {
    'src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
  config: {
    withComponent: false,
    withHOC: false,
    withHooks: true,
  },
};

export default config;
