import UserPanelLayout from "@/src/layouts/admin/nav";
import Create from "@/src/components/main/blogs/Create";
import PrivateRoute from '../../../components/PrivateRoutes/PrivateRoute';
import { useAuth } from "@/src/context/authContext";


CreateBlogPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function CreateBlogPage() {

  return (
    <PrivateRoute>
      <Create />
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