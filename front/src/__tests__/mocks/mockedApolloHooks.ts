import * as Apollo from '@apollo/client';

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
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

const mockedUseLoginMutation = jest
  .fn()
  .mockImplementation(
    (baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) => {
      const options = { ...{}, ...baseOptions };
      return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        options,
      );
    },
  );

jest.mock('@/generated/graphql', () => ({
  ...(jest.requireActual('@/generated/graphql') as any),
  useRegisterMutation: () => mockedUseRegisterMutation(),
  useLoginMutation: () => mockedUseLoginMutation(),
}));

export { mockedUseLoginMutation, mockedUseRegisterMutation };
