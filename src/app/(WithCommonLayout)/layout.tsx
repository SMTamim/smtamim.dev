import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";

const HomeLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default HomeLayout;