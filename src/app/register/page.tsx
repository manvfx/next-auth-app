"use client"
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export default function Register() {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestPayload = {
            name: event.currentTarget.fullName.value,
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
        }

        try {
            const { data } = await axios.post("/api/auth/register", requestPayload);
            router.push('/')

        } catch (error) {
            const err = error as AxiosError;
            alert(err.message)
        }
    }

    return (
        <div className="max-w-3xl mx-auto py-16">
            <h1 className="mt-2">User Registration</h1>
            <form onSubmit={handleSubmit} className="mt-3">
                <div>
                    <label htmlFor="fullName" className="mr-1">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        className="border rounded border-slate-700"
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="email" className="mr-1">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        required
                        className="border rounded border-slate-700"
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="password" className="mr-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="border rounded border-slate-700"
                    />
                </div>
                <button className="p-2 bg-orange-600 text-white w-fit rounded" type="submit">Submit</button>
            </form>
        </div>
    );
}
