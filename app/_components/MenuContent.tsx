"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle, } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import DialogContentLogin from "./LoginDialogContent"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";


const MenuContent = () => {

    const { data } = useSession() //gerenciar usuario logado

    const handleLogOutGoogle = () => signOut()

    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center justify-between gap-3 border-b py-5">
                {/* se existir usuario logado rederiza o componente de cima, senao o componente d`baixo */}
                {data?.user ? (
                    <div className="flex items-center gap-2">
                        <Avatar className="items-center border border-purple-600">
                            <AvatarImage src={data.user.image ?? ""} />
                        </Avatar>

                        <div>
                            <h2 className="font-bold">{data.user.name}</h2>
                            <p>{data.user.email}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="font-bold text-lg">Ola. Faça seu login!</h2>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="rounded" size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%]">
                                <DialogContentLogin />
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </div>


            <div className="p-5 flex flex-col gap-5 border-b border-solid">
                {/* asChild é usado para nao dar error de 'hidratation' co o Link ou tag 'a'*/}
                <SheetClose asChild>
                    <Button className="rounded-xl justify-start border-none gap-2" asChild>
                        <Link href={"/"}>
                            <HomeIcon size={18} />
                            Ínicio
                        </Link>
                    </Button>
                </SheetClose>
                <Button className="rounded-xl justify-start border-none gap-2" variant="outline" asChild>
                    <Link href={"/bookings"}>
                        <CalendarIcon size={18} />
                        Agendamentos
                    </Link>
                </Button>
            </div>

            <div className="p-5 flex flex-col gap-5 border-b border-solid">
                {quickSearchOptions.map((option) => (
                    <SheetClose key={option.title} asChild>
                        <Button className="rounded-xl justify-start border-none gap-2" variant="outline" asChild>
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image src={option.imageUrl} alt={option.title} width={18} height={18} />
                                {option.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            {data?.user && (
                <div className="p-5">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="rounded-xl flex gap-2 border-none" variant="outline">
                                <LogOutIcon />
                                Sair da conta
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[90%]">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sair</AlertDialogTitle>
                                <AlertDialogDescription>Deseja mesmo sair da plataforma?</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                                <AlertDialogAction className="rounded-xl" onClick={handleLogOutGoogle}>Sair</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </SheetContent>
    );
};


export default MenuContent
