import BottomBar from "./Bottombar";
import Sidebar from "./Sidebar";

type MainLayoutProps = {
    children?: React.ReactNode;
};
export default function UserPanelLayout({ children }: MainLayoutProps) {
    return (
        <div>
            <div className="flex flex-col sm:flex-row">
                <Sidebar />
                <div className="flex-1 px-4 lg:px-10 pb-10">
                    {children}
                </div>
                <div className="h-[8vh] order-3  bottom-0 sm:hidden fixed bottom-0 left-0 w-full">
                    <BottomBar />
                </div>
            </div>
        </div>
    );
}
