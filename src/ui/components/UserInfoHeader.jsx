import React from "react";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../routes/routes_consts"

export default function UserInfoHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate(HOME);
    };

    const user = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user")
    );

    if (!user) return null;

    return (
        <div className="absolute top-2 right-8 flex items-center gap-3 z-100 bg-primary rounded-2xl p-2 px-4">
            <div className="flex flex-col">
                <span className="text-white font-medium text-lg">{user.name}</span>
                <a
                    onClick={handleLogout}
                    className="text-white hover:cursor-pointer hover:underline"
                >
                    logout
                </a>
            </div>

            <img
                src={user.avatarImg}
                alt="avatar"
                className="w-10 h-10 rounded-full border border-white"
            />
        </div>
    );
}