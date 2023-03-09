import * as Apollo from '@apollo/client';

import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from '@/generated/graphql';

const mockedUseRegisterMutation = jest
  .fn()
  .mockImplementation(
    (
      baseOptions?: Apollo.MutationHookOptions<
        RegisterMutation,
        RegisterMutationVariables
      >,
    ) => {
      const options = { ...{}, ...baseOptions };
      return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        options,
      );
    },
  );

jest.mock('@/generated/graphql', () => ({
  ...(jest.requireActual('@/generated/graphql') as any),
  useRegisterMutation: () => mockedUseRegisterMutation(),
}));

export { mockedUseRegisterMutation };
