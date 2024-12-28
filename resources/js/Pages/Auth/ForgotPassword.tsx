import InputError from '@/Components/Login/InputError';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Login/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout header={
            <h2 className="text-xl font-semibold leading-tight "> Forgot Password </h2>}>
            <Head title="Forgot Password" />

            

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

                
                        
            <form
                onSubmit={submit}
                className=" w-full h-full max-w-md p-6 m-auto rounded-md bg-white/80 shadow-lg"
                >
                    <h1 className="mb-4 text-lg text-gray-600">
                        Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                        <br /> <br /> 
                    </h1>

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="mt-4 flex items-center justify-end">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Email Password Reset Link
                            </PrimaryButton>
                        </div>
                    </form>
             
        </GuestLayout>
    );
}
