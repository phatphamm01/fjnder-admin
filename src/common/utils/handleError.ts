import { toast } from 'react-toastify';

interface GqlError {
  message: string;
  statusCode: number;
}

interface GqlErrors {
  gqlErrors: GqlError[];
  variables: any;
  query: string;
}

export const handleError = (err: any) => {
  if ('gqlErrors' in err) {
    toast.error(err.gqlErrors[0].message);
    console.error(`${err.query}: `, err);

    return;
  }

  console.error('Error: ', err);
};
