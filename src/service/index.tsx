import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { useAuthStore } from '~/store/auth';
import { ENDPOINT } from '~/common/constants/endpoint';
import { apiProvider } from '~/api-graphql';

const httpLink = createUploadLink({
  uri: `${ENDPOINT}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = useAuthStore.getState().accessToken;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const apiCaller = apiProvider(graphqlClient);
