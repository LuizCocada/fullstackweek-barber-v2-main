import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, Icon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const MenuContent = () => {
    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center justify-between gap-3 border-b py-5">
                <h2 className="font-bold text-lg">Ola. Faça seu login!</h2>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="rounded" size="icon">
                            <LogInIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%]">
                            <DialogHeader>
                                <DialogTitle>Faça seu login na plataforma</DialogTitle>
                                <DialogDescription>Conecte-se usando sua conta Google</DialogDescription>
                            </DialogHeader>

                            <Button className="flex gap-1 rounded-xl" variant={"sheet"}>
                                <Image src={"/googleIcon.svg"} width={16} height={16} alt="icon Google" />
                                <p className="font-bold">Google</p>
                            </Button>
                    </DialogContent>
                </Dialog>


                {/* <Avatar className="items-center border border-purple-600">
                    <AvatarImage src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </Avatar>

                <div>
                    <h2 className="font-bold">Ramon da Silva</h2>
                    <p>ramonSilva@gmail.com</p>
                </div> */}
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
                <Button className="rounded-xl justify-start border-none gap-2" variant="sheet">
                    <CalendarIcon size={18} />
                    Agendamentos
                </Button>
            </div>

            <div className="p-5 flex flex-col gap-5 border-b border-solid">
                {quickSearchOptions.map((option) => (
                    <Button className="rounded-xl justify-start border-none gap-2" variant="sheet">
                        <Image src={option.imageUrl} alt={option.title} width={18} height={18} />
                        {option.title}
                    </Button>
                ))}
            </div>

            <div className="p-5">
                <Button className="rounded-xl flex gap-2 border-none" variant="sheet">
                    <LogOutIcon />
                    Sair da conta
                </Button>
            </div>
        </SheetContent>
    );
};


export default MenuContent
