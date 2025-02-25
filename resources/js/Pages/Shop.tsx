    import { useEffect } from "react";
    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
    import GuestLayout from '@/Layouts/GuestLayout';
    import { Head } from '@inertiajs/react'; 

    import Swal from 'sweetalert2';

    import FilterDropdown from "@/Components/Dropdown/FilterDropdown";
    import FilterButton from "@/Components/Buttons/FilterButton";
    import SortDropdown from "@/Components/Dropdown/SortDropdown";
    import AddItemButton from "@/Components/Buttons/AddItemButton";
    import ProductCard from "@/Components/Cards/ProductCard";
    import Breadcrumb from "@/Components/Nav/Breadcrumb"; 
    import { ShopProvider, useShop } from "@/Contexts/ShopContext";

    interface ShopProps {
        auth: { user: any } | null;
        items: any[];
        category: string;
        message: string;
        showFilter: boolean;
    }

    const ShopContent: React.FC<ShopProps> = ({ auth, items, category, message }) => {
        const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;
        const { filterVisible, filteredItems } = useShop();
        console.log(filterVisible);

        useEffect(() => {
            if (message) {
                Swal.fire({
                    title: "Success!",
                    text: typeof message === 'string' ? message : JSON.stringify(message),
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        }, [message]);

        return (
            <Layout
                header={
                    <div className="h-[6vh] z-10 w-full overflow-visible flex justify-between items-center gap-4 ">
                        <Breadcrumb 
                            items={[
                                { label: "SHOP", link: route('shop') },
                                { label: category, link: route('shop', { category }) },
                            ]}
                        />
                        <FilterDropdown />
                        <div className="flex items-center gap-4">
                            <FilterButton />
                            <SortDropdown />
                            <AddItemButton />
                        </div>
                    </div>
                }
            >
                <Head title="Shop" />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                    {filteredItems.length === 0 ? (
                        <div className="w-full h-full text-center p-20">
                                    {/* Animated Heading */}
                            <h1
                            className="font-Audrey text-transparent bg-clip-text bg-gradient-to-t 
                             text-[150px] leading-tight text-shadow-beige-glow
                            dark:from-[#e7e77a] dark:to-white 
                            from-[#a8a850] via-[#6d6d12] to-[#303018]/30"
                            >
                            COMING SOON
                            </h1>
                        </div>
                    ) : (
                        <div className={`grid grid-cols-3 gap-6 rounded-lg py-5 transition-all duration-500 ${filterVisible ? 'ml-48' : ''}`}>
                            {filteredItems.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </Layout>



        );
    };

    const Shop: React.FC<ShopProps> = (props) => (
        <ShopProvider items={props.items}>
            <ShopContent {...props} />
        </ShopProvider>
    );

    export default Shop;
