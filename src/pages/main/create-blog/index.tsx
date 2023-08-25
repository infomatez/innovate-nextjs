import UserPanelLayout from "@/src/layouts/admin/nav";
import Create from "@/src/components/main/blogs/Create";


CreateBlogPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function CreateBlogPage() {

  return (
    <Create />
  )
}