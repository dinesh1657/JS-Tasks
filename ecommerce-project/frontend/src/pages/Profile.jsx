import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getProfile } from "../services/api";

function Profile() {
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProfile();

                setProfile(data.user);
            } catch (error) {
                console.error(
                    "Profile error:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load profile"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="profile-page">
                <h2>Loading profile...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-page">
                <h2>{error}</h2>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="profile-page">
                <h2>Profile not found</h2>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <h1>My Profile</h1>

            <div className="profile-card">
                <p>
                    <strong>Name:</strong>{" "}
                    {profile.name}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {profile.email}
                </p>

                <p>
                    <strong>Role:</strong>{" "}
                    {profile.role}
                </p>

                <p>
                    <strong>User ID:</strong>{" "}
                    {profile.id}
                </p>

                <p>
                    <strong>Joined:</strong>{" "}
                    {new Date(
                        profile.created_at
                    ).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}

export default Profile;