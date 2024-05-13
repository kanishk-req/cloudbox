import { datatype } from "../../components/types"
export const options = [
    {
        name: "open",
        onClick: (item: datatype) => {
            window.open(item.url);
        },
    },
    {
        name: "delete",
        onClick: () => {
            alert("Deleting ");
        },
    },
    {
        name: "share",
        onClick: () => {
            alert("sharing ");
        },
    },
];