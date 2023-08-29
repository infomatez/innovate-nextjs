import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export const withAuthServerSideProps = (innerGetServerSideProps?: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const { accessToken } = context.req.cookies;

    if (!accessToken) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (innerGetServerSideProps) {
      return innerGetServerSideProps(context);
    }

    return {
      props: {},
    };
  };
};
