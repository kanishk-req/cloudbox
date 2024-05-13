import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image';
import { datatype, themeType } from '../types'
import { options } from '../../utils/constant/index';
import OptionsModal from '../modals/optionsModal';

export type ModalState = Dispatch<SetStateAction<ModalObject>>
export type ActionState = "open" | "delete" | "share";
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
    share = "share"
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
            default:
                break;
        }
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
                    className="absolute top-[2.5rem] z-10 right-1  rounded-md w-[6rem] h-[6rem]"
                    style={{
                        backgroundColor: theme.secondary,
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
                                className="w-full h-8 flex cursor-pointer justify-center items-center hover:bg-gray-200 hover:text-gray-700"
                                style={{
                                    borderTop:
                                        key === options.length - 1
                                            ? "1px solid lightgray"
                                            : key === 0
                                                ? "none"
                                                : "1px solid lightgray",
                                    borderBottom:
                                        key === 0
                                            ? "1px solid lightgray"
                                            : key === options.length - 1
                                                ? "none"
                                                : "1px solid lightgray",
                                    borderRadius:
                                        key === 0
                                            ? "6px 6px 0 0"
                                            : key === options.length - 1
                                                ? "0 0 6px 6px"
                                                : "none",
                                }}
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