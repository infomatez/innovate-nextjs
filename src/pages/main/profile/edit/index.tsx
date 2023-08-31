import UserPanelLayout from "@/src/layouts/admin/nav";
import ProfileEdit from "@/src/components/main/profile/Edit";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/src/components/PrivateRoutes/withAuthServerSideProps";

ProfileEditPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function ProfileEditPage() {
    return (
        <ProfileEdit />
    )
}

// export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();

  