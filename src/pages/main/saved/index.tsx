import UserPanelLayout from "@/src/layouts/admin/nav";

SavedBlogPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function SavedBlogPage()  {
  return (
   <div className="text-white">
    Saved
   </div>
  )
}
