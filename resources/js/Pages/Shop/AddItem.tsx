import React, { useState, ChangeEvent, DragEvent } from "react";
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/Login/InputError';
import InputLabel from '@/Components/Login/InputLabel';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Login/TextInput';
import { Select, Option } from "@material-tailwind/react";
import { Transition } from '@headlessui/react';
import Dropdown from '@/Components/Login/Dropdown';
import { router } from '@inertiajs/react';

const categories = [
    "Agar", "Apparel", "Books", "Equipment", "Foraging", "Gourmet", "Grow Kits", 
    "Infused Products", "Microscopy", "Spawn", "Spores"
];

export default function AddItem() {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        category: '', // This will hold the selected category
        price: '',
        stock: '',
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);  // For showing image previews

    const Layout = AuthenticatedLayout; // Layout component based on authentication

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

        const validImages = files.filter(file =>
            file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // Limit to 5MB per file
        );

        if (validImages.length > 0) {
            const newImagePreviews = validImages.map((file) =>
                URL.createObjectURL(file)
            );

            setImagePreviews([...imagePreviews, ...newImagePreviews]);
            setData('images', [...data.images, ...validImages]);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        const validImages = files.filter(file =>
            file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // Limit to 5MB per file
        );

        if (validImages.length > 0) {
            const newImagePreviews = validImages.map((file) =>
                URL.createObjectURL(file)
            );

            setImagePreviews([...imagePreviews, ...newImagePreviews]);
            setData('images', [...data.images, ...validImages]);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newPreviews = [...imagePreviews];
        const newImages = [...data.images];
        
        newPreviews.splice(index, 1);
        newImages.splice(index, 1);

        setImagePreviews(newPreviews);
        setData('images', newImages);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data); // Log the form data before submission
        post(route('items.store'), {
            data,
            onSuccess: () => {
                console.log('Item added successfully.');
                router.visit('/shop'); // Redirect to the Shop page
            },
            onError: (errors) => {
                console.error('Error:', errors);
            },
        });
    };

    return (
        <Layout header={<h2 className="text-xl font-semibold leading-tight text-gray-900 dark:text-white">Add New Item</h2>}>
            <Head title="Add New Item" />
           
            <section className="rounded-lg w-full h-full max-w-xl  m-auto shadow-md p-5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-none">
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Item Name" className="dark:text-slate-100" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 focus:dark:border-indigo-500 focus:ring-indigo-500"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                        />
                        <InputError className="mt-2 dark:text-red-400" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="category" value="Category" className="dark:text-slate-100" />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="mt-1 block w-full text-left border border-gray-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 focus:ring-indigo-500 focus:ring-1 px-4 py-2 rounded-md">
                                    {data.category || 'Select a category'}
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <ul className="absolute right-0 top-full w-[295%] mt-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50">
                                    {categories.map((category) => (
                                        <li
                                            key={category}
                                            className="cursor-pointer px-6 py-2 text-sm text-slate-700 dark:text-slate-100 hover:bg-indigo-600 hover:text-white"
                                            onClick={() => setData('category', category)}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    <div>
                        <InputLabel htmlFor="price" value="Price" className="dark:text-slate-100" />
                        <TextInput
                            id="price"
                            type="number"
                            className="mt-1 block w-full dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 focus:dark:border-indigo-500 focus:ring-indigo-500"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            required
                        />
                        <InputError className="mt-2 dark:text-red-400" message={errors.price} />
                    </div>

                    <div>
                        <InputLabel htmlFor="stock" value="Stock" className="dark:text-slate-100" />
                        <TextInput
                            id="stock"
                            type="number"
                            className="mt-1 block w-full dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 focus:dark:border-indigo-500 focus:ring-indigo-500"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                        />
                        <InputError className="mt-2 dark:text-red-400" message={errors.stock} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-100">Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 rounded-md focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500"
                        />
                        <div className="mt-2 space-x-4 flex flex-wrap">
                            {imagePreviews.map((image, index) => (
                                <div key={index} className="relative w-24 h-24">
                                    <img src={image} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-0 right-0 text-white bg-red-600 hover:bg-red-700 p-1 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <PrimaryButton type="submit" className="w-full" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Item'}
                    </PrimaryButton>
                </form>
            </section>
        </Layout>
    );
}
