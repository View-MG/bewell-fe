import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Link from "next/link";
import { Trigger } from "./Trigger";

export function Navbar() {
    return(
        <nav className="h-18 w-full bg-white px-8 shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between py-4 h-full">
                <div>
                    <Trigger/>
                    <Link
                    data-testid="navbar-home-link"
                    href="/"
                    className="text-lg font-semibold">Bewell</Link>
                </div>
                
                <Link 
                    data-testid="navbar-home-link"
                    href="/"
                    className="text-lg font-semibold">
                    <Avatar size="large" icon={<UserOutlined />} />
                </Link>
                
            </div>
        </nav>
    );
};