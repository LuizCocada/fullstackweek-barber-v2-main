import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import MenuContent from "./MenuContent";

const Header = () => {
    return (
        <Card>
            <CardContent className="p-5 items-center flex flex-row justify-between">
                <Link href={"/"}>
                    <Image src="/LogoBarber.png" height={18} width={120} alt={"logo barbearia"} />
                </Link>
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon />
                    </SheetTrigger>
                    
                    <MenuContent />
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;

