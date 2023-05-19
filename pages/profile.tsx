import React from "react";
import Sidebar from "@/components/ui/sidebar";
import Image from "next/image";
import { useAuth } from "./contexts/auth";

function Profile() {
  const { user, UpdateUserDetails } = useAuth();
  const [ModalState, setModalState] = React.useState(true);
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
            className="w-32 h-32 rounded-full bg-white relative"
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
