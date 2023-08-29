import { useAuth } from '@/src/context/authContext';
import PrivateRoute from '../../../components/PrivateRoutes/PrivateRoute'; // Adjust the import path
import UserPanelLayout from '@/src/layouts/admin/nav';
import AboutUs from '@/src/pages/about-us';

AboutUsPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function AboutUsPage() {
  return (
    <PrivateRoute>
      <div className="text-white">
        <AboutUs />
      </div>
    </PrivateRoute>
  );
}


export const getServerSideProps = async (context: any) => {
  const { accessToken } = context.req.cookies;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const authContext = useAuth();
  if (!authContext.accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};





