import UserPanelLayout from "@/src/layouts/admin/nav";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/src/components/PrivateRoutes/withAuthServerSideProps";

SavedBlogPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function SavedBlogPage() {
  return (
      <div className="text-white">
        Saved
      </div>
  )
}


export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
