import UserPanelLayout from "@/src/layouts/admin/nav";

NotificationPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function NotificationPage()  {
  return (
   <div className="text-white">
    Notification
   </div>
  )
}
