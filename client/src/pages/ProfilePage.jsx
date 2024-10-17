import React, { useState } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";

function ProfilePage() {
  const { authUser } = useAuthStore();
	const [name, setName] = useState(authUser.name || "");
	const [bio, setBio] = useState(authUser.bio || "");
	const [age, setAge] = useState(authUser.age || "");
	const [gender, setGender] = useState(authUser.gender || "");
	const [genderPreference, setGenderPreference] = useState(authUser.genderPreference || []);
	const [image, setImage] = useState(authUser.image || null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
    </div>
  );
}

export default ProfilePage;
