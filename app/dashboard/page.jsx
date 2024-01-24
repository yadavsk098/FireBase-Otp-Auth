"use client"
import { getAuth, signOut } from "firebase/auth";
import { app } from '../config'
import { useRouter } from "next/navigation";


function Dashboard() {
    const auth = getAuth(app);
    const router = useRouter();

    const handelLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');


        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-12">
            <h1 className="text-4xl font-bold mb-10">WELCOME to Dashboard</h1>
            <button onClick={handelLogout} className="bg-red text-black p-2 border border-slate-900 rounded-md">Logout</button>
        </main>
    );
}

export default Dashboard;