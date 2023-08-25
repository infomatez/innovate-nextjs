import UserPanelLayout from "@/src/layouts/admin/nav";
import ProfileEdit from "@/src/components/main/profile/Edit";

ProfileEditPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function ProfileEditPage() {
    return (
        <ProfileEdit />
    )
}
