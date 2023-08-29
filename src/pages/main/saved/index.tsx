import UserPanelLayout from "@/src/layouts/admin/nav";
import PrivateRoute from '../../../components/PrivateRoutes/PrivateRoute';
import { useAuth } from "@/src/context/authContext";

SavedBlogPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function SavedBlogPage() {
  return (
    <PrivateRoute>
      <div className="text-white">
        Saved
      </div>
    </PrivateRoute>
  )
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