import { useState } from "react";

export default function EditLabourProfile() {
  const [photo, setPhoto] = useState(null);
  const [skills, setSkills] = useState([
    "Electrician",
    "Wiring",
    "AC Repair",
  ]);
  const [newSkill, setNewSkill] = useState("");

  // photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  // add skill
  const addSkill = () => {
    if (newSkill.trim() === "") return;
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  // remove skill
  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white">
          <p className="text-sm opacity-90 cursor-pointer">
            ← Back to Dashboard
          </p>
          <h1 className="text-3xl font-semibold mt-2">Edit Profile</h1>
          <p className="opacity-90">
            Update your profile to attract more employers
          </p>
        </div>

        {/* BODY */}
        <div className="p-10">

          {/* PROFILE PHOTO */}
          <div className="flex items-center gap-6 mb-10">
            <div className="w-28 h-28 rounded-2xl bg-orange-100 overflow-hidden flex items-center justify-center shadow">
              {photo ? (
                <img
                  src={photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl text-orange-500">👤</span>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg">Profile Photo</h3>
              <p className="text-sm text-gray-500 mb-2">
                JPG, PNG · Max 5MB
              </p>

              <label className="cursor-pointer text-orange-600 font-medium hover:underline">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                defaultValue="Rajesh Kumar"
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                defaultValue="+91 9876543210"
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Experience (Years)
              </label>
              <input
                type="number"
                defaultValue={8}
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Your Rate (₹)
              </label>
              <div className="flex gap-3 mt-1">
                <input
                  type="number"
                  defaultValue={600}
                  className="flex-1 rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <select className="rounded-xl border px-4 py-3">
                  <option>Per Day</option>
                  <option>Per Hour</option>
                </select>
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="mt-8">
            <label className="text-sm font-medium text-gray-600">
              Address / Location
            </label>
            <input
              defaultValue="Sector 18, Noida, UP"
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* ABOUT */}
          <div className="mt-8">
            <label className="text-sm font-medium text-gray-600">
              About Yourself
            </label>
            <textarea
              rows={4}
              defaultValue="Experienced electrician with expertise in residential and commercial wiring, AC installation and repair."
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* SKILLS */}
          <div className="mt-8">
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Your Skills
            </label>

            <div className="flex flex-wrap gap-3 mb-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 rounded-xl border px-4 py-3 outline-none"
              />
              <button
                onClick={addSkill}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-xl shadow"
              >
                Add
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 mt-12">
            <button className="px-6 py-3 rounded-xl border hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
