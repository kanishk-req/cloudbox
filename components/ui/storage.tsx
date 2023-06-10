import React from "react";

function Storage() {
  const [Data, setData] = React.useState<any>(null);
  React.useEffect(() => {
    const value = localStorage.getItem("User");
    if (value) {
      setData(JSON.parse(value));
    }
  }, []);

  return (
    <div>
      <h1>Storage</h1>
      <div className="flex flex-wrap justify-evenly">
        <div className="flex flex-col items-center justify-center w-1/3 h-1/3 p-2 m-2 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold">Total</h1>
          <h1 className="text-2xl font-bold">{Data?.Storage?.Total} MB</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-1/3 h-1/3 p-2 m-2 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold">Used</h1>
          <h1 className="text-2xl font-bold">{Data?.Storage?.Used} MB</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-1/3 h-1/3 p-2 m-2 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold">Free</h1>
          <h1 className="text-2xl font-bold">{Data?.Storage?.Free} MB</h1>
        </div>
      </div>
    </div>
  );
}

export default Storage;
