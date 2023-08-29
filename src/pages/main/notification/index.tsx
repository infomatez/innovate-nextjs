import UserPanelLayout from "@/src/layouts/admin/nav";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/src/components/PrivateRoutes/withAuthServerSideProps";


NotificationPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function NotificationPage()  {
  return (

   <div className="text-white">
    Notification
   </div>
 
  )
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();

