import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image';
import { datatype, themeType } from '../types'
import { options } from '../../utils/constant/index';
import OptionsModal from '../modals/optionsModal';

export type ModalState = Dispatch<SetStateAction<ModalObject>>
export type ActionState = "open" | "delete" | "share" | "download";
export type ModalObject = {
    status: string;
    item: {
        name: string;
        url: string;
    };
}
export enum Action {
    open = "open",
    delete = "delete",
    share = "share",
    download = "download"
}

export const Actions = ({ theme, item, index }: {
    theme: themeType,
    item: datatype,
    index: number
}) => {
    const [menu, setMenu] = useState<number>(-1);
    const [modal, setModal] = useState<ModalObject>({ status: "", item: { name: "", url: "" } })
    const handleClick = (index: number) => {
        if (index !== menu) setMenu(index);
        else setMenu(-1);
    };
    const handleAction = (Actions: ActionState, item: datatype) => {
        switch (Actions) {
            case Action.open:
                setModal({ status: Action.open, item: item });
                break;
            case Action.delete:
                setModal({ status: Action.delete, item: item });
                break;
            case Action.share:
                setModal({ status: Action.share, item: item });
                break;
            case Action.download:
                handleDownload(item);
                break
            default:
                break;
        }
    }
    const handleDownload = async (item: datatype) => {
        fetch(item.url)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${item.name}`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });

    }
    return (
        <React.Fragment>
            {index !== -1 && menu === index ? (
                <div
                    className="hover:bg-gray-200 rounded-full hover:border-gray-200 h-7 w-7 flex justify-center items-center"
                    style={{
                        filter: theme.invertImage ? "invert(1)" : "invert(0)",
                    }}
                    onClick={() => {
                        handleClick(index);
                    }}
                >
                    <Image
                        src="/cross.svg"
                        width={10}
                        height={10}
                        alt=":"
                    />
                </div>
            ) : (
                <div
                    className="hover:bg-gray-200 rounded-full hover:border-gray-200 h-7 w-7 flex justify-center items-center"
                    style={{
                        filter: theme.invertImage ? "invert(1)" : "invert(0)",
                    }}
                    onClick={() => {
                        handleClick(index);
                    }}
                >
                    <Image
                        src="/threeDotsVertical.svg"
                        width={20}
                        height={20}
                        alt=":"
                    />
                </div>
            )}
            {index !== -1 && menu === index && (
                <div
                    className="absolute top-[3rem] z-10 right-1  rounded-md w-[10rem] h-[auto] p-3"
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.secondaryText,
                    }}
                >
                    {options.map((Optionitem, key) => (
                        <div
                            key={key}
                            className="w-full h-1/3 flex justify-center items-center rounded-md"
                        >

                            <div
                                onClick={() => {
                                    handleAction(Optionitem.name as ActionState, item);
                                }}
                                className="w-full p-2 rounded-md flex cursor-pointer pl-2 items-center hover:bg-gray-200 hover:text-gray-700"
                            >
                                {Optionitem.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <OptionsModal modal={modal} setModal={setModal} itemUrl={item.url} />
        </React.Fragment>
    )
}