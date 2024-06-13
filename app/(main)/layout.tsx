import Sidebar from "@/components/sidebar";
import Stats from "@/components/stats";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen py-4 px-4 sm:px-8 md:px-16 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-1 md:col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-1 md:col-span-2">{children}</div>
      <div className="col-span-1 md:col-span-1">
        <Stats />
      </div>
    </div>
  );
};

export default MainLayout;
