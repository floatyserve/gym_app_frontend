import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export function Header() {
    const navigate = useNavigate();
    const {logout} = useAuth();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    function goToProfile() {
        navigate("/profile");
    }

    return (
        <header className="w-full bg-slate-800 h-14 flex items-center justify-between px-6">
            <div className="text-slate-100 font-semibold text-lg cursor-default"
                 onClick={() => navigate("/")}
                 style={{cursor: "pointer"}}
            >
                Gym App
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={goToProfile}
                    className="text-slate-200 hover:text-white focus:outline-none"
                    aria-label="Profile"
                    style={{ cursor: "pointer" }}
                >
                    Profile
                </button>

                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-400 focus:outline-none"
                    aria-label="Logout"
                    style={{ cursor: "pointer" }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
