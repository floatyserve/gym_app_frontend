import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {getById as getUserById} from "../api/user.api";
import {getByUserId as getWorkerByUserId} from "../api/worker.api";
import type {User} from "../types/user/User.ts";
import type {Worker} from "../types/worker/Worker.ts";
import {AppLayout} from "../layouts/AppLayout.tsx";

export function ProfilePage() {
    const {user} = useAuth();
    const [userData, setUserData] = useState<User | null>(null);
    const [workerData, setWorkerData] = useState<Worker | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            if (!user) return;

            try {
                const fetchedUser = await getUserById(user.id);
                setUserData(fetchedUser);

                const fetchedWorker = await getWorkerByUserId(user.id);
                setWorkerData(fetchedWorker);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [user]);

    if (loading) return <div>Loading profile...</div>;
    if (!userData) return <div>No user data found</div>;

    return (
        <AppLayout>
            <div className="max-w-xl mx-auto p-6 bg-slate-800 rounded text-slate-100">
                <h1 className="text-2xl font-semibold mb-4">Profile</h1>

                <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">User Info</h2>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                    <p><strong>Status:</strong> {userData.active ? "Active" : "Inactive"}</p>
                </section>

                {workerData && (
                    <section className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Worker Info</h2>
                        <p><strong>Name:</strong> {workerData.firstName} {workerData.lastName}</p>
                        <p><strong>Phone:</strong> {workerData.phoneNumber}</p>
                        <p><strong>Birth Date:</strong> {new Date(workerData.birthDate)
                            .toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})
                            .replace(/\//g, '-')}
                        </p>
                        <p><strong>Hired At:</strong> {new Date(workerData.hiredAt)
                            .toLocaleString(
                                'en-GB',
                                {day: '2-digit', month: '2-digit', year: 'numeric', hour: "numeric", minute: "numeric"}
                            ).replace(/\//g, '-')
                        }</p>
                    </section>
                )}

                <button
                    onClick={() => alert("TODO: implement")}
                    className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded"
                >
                    Change Password
                </button>
            </div>
        </AppLayout>
    );
}
