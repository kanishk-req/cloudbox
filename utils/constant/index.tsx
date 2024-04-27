import { datatype } from "../../components/types"
export const options = [
    {
        name: "Open",
        onClick: (item: datatype) => {
            window.open(item.url);
        },
    },
    {
        name: "Delete",
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