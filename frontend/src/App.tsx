import {AuthProvider, useAuth} from "./context/AuthContext";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {DashboardPage} from "./pages/DashboardPage";
import type {JSX} from "react";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {AccessCardsPage} from "./pages/AccessCardsPage.tsx";
import LockersPage from "./pages/LockersPage.tsx";
import StaffPage from "./pages/StaffPage.tsx";
import CustomersPage from "./pages/CustomersPage.tsx";

export function ProtectedRoute({children}: { children: JSX.Element }) {
    const {user, loading} = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace/>;

    return children;
}

export function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <DashboardPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <ProfilePage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/access-cards" element={
                        <ProtectedRoute>
                            <AccessCardsPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/lockers" element={
                        <ProtectedRoute>
                            <LockersPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/staff" element={
                        <ProtectedRoute>
                            <StaffPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/customers" element={
                        <ProtectedRoute>
                            <CustomersPage/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;