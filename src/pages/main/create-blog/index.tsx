import UserPanelLayout from "@/src/layouts/admin/nav";
import Create from "@/src/components/main/blogs/Create";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/src/components/PrivateRoutes/withAuthServerSideProps";


CreateBlogPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function CreateBlogPage() {

  return (
      <Create />
  )
}

// export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
