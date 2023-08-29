import UserPanelLayout from "@/src/layouts/admin/nav";
import ProfileEdit from "@/src/components/main/profile/Edit";
import PrivateRoute from '../../../../components/PrivateRoutes/PrivateRoute';
import { useAuth } from "@/src/context/authContext";

ProfileEditPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function ProfileEditPage() {
    return (
        <PrivateRoute>
            <ProfileEdit />
        </PrivateRoute>
    )
}


export const getServerSideProps = async (context: any) => {
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