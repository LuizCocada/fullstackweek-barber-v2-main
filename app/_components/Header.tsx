import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Icon, MenuIcon } from "lucide-react";

const Header = () => {
    return(
    <Card>
        <CardContent className="p-5 items-center flex flex-row justify-between">
            <Image src="/LogoBarber.png" height={18} width={120} alt={"logo barbearia"}/>
            <Button size="icon" variant="outline">
                <MenuIcon />
            </Button>
        </CardContent>
    </Card>
    );
}

export default Header;
