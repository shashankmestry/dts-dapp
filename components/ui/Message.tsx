"use client";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import Button from "./Button"
import { cn } from "@/lib/utils";

interface MsgProps {
    type: string,
    show: boolean,
    title: string,
    description: string
}

const Message = ({ message, setMessage }: { message: MsgProps, setMessage: Function }) => {
    const closeError = () => {
        setMessage({
            type: message.type,
            show: false,
            title: message.title,
            description: message.description
        });
    }
    return (
        <Transition appear show={message.show}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog as="div" className="relative z-50 focus:outline-none" onClose={() => { }}>
                    <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className={cn("w-full max-w-md rounded-xl  p-6 backdrop-blur-2xl", message.type == 'success' ? 'bg-green-600/75' : 'bg-red-500/75')}>
                                    <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                        {message.title}
                                    </DialogTitle>
                                    <p className="mt-2 text-white/75">
                                        {message.description}
                                    </p>
                                    <div className="mt-4">
                                        <Button
                                            className={message.type == 'success' ? 'text-green-600' :"text-red-500"}
                                            onClick={() => closeError()}
                                        >
                                            Okay!
                                        </Button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </div>
        </Transition>
    )
}

export default Message