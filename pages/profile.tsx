import React from "react";
import Sidebar from "@/components/ui/sidebar";
import Image from "next/image";
import { useAuth } from "./contexts/auth";
import { useTheme } from "./contexts/theme";

function Profile() {
  const { user, UpdateUserDetails, signOut } = useAuth();
  const { theme } = useTheme(); 
  const logout = () => {
    signOut();
    window.location.href = "/";
  };

  const [ModalState, setModalState] = React.useState(true);
  const [copyState, setCopyState] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    photoUrl: "",
  });
  React.useEffect(() => {
    setUserDetails({
      name: user?.displayName ?? "",
      email: user?.email ?? "",
      photoUrl: user?.photoURL ?? "",
    });
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userDetails.name === "" || userDetails.email === "") {
      alert("Please fill all the fields");
      return;
    }
    UpdateUserDetails(userDetails.name, userDetails.photoUrl);

    setUserDetails({
      name: user?.displayName ?? "",
      email: user?.email ?? "",
      photoUrl: user?.photoURL ?? "",
    });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(user!.uid);
    setCopyState(true);
    setInterval(() => {
      setCopyState(false);
    }
    , 3000);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center justify-center w-full h-[30vh] bg-orange-300">
          <div
            id="imageHolder"
            className="w-32 h-32 rounded-full  relative"
            style={{
              backgroundColor: theme.primary,
            }}
            onClick={() => setModalState(true)}
          >
            <input
              type="file"
              className="absolute z-20 h-full w-full opacity-0"
            />
            <Image
              src="/activeUser.svg"
              fill
              alt="profile"
              className="rounded-full"
            />
          </div>
        </div>
        <form className="px-[5vw] pt-[5vh]" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
              placeholder=" "
              value={userDetails.name}
              disabled={user?.displayName ? true : false}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
            {userDetails.name.length <= 0 && (
              <label
                htmlFor="floating_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500"
              >
                Name
              </label>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="floating_company"
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
              placeholder=" "
              value={userDetails.email}
              disabled={user?.email ? true : false}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            {userDetails.email.length <= 0 && (
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500"
              >
                Email
              </label>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group ">
            <label className="text-sm text-gray-500mr-4">
              Secret Token : 
            </label>
            <input
              type="text"
              value={user?.uid}
              className="text-sm w-[16rem] p-2 mx-2 text-gray-900 bg-transparent  appearance-none"
            />
            {/* copy button */}
            <button
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 "
              onClick={() => {
                handleCopy()
              }}
            >
              {
                copyState ? "Copied" : "Copy"
              }
            </button>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
          <button
            type="button"
            onClick={logout}
            className="text-white ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center -700"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
