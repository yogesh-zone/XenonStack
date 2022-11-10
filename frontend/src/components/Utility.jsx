import React from 'react'
import Helmet from "react-helmet";
import { Avatar, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { MdOutlineAccountCircle, MdOutlineSell } from 'react-icons/md'
import { Link } from 'react-router-dom';
export const link = [
    { name: "Home", link: "/" },
    { name: "Sell Car", link: "/addItem" },
    { name: "Contact Us", link: "/Contact Us" }
]
export const AvatarIcon = ({ user, setUser }) => {
    const handleUser = () => {
        setUser(null);
    }
    return (
        <Menu isLazy>
            <MenuButton>
                <Avatar size='md' src={"https://res.cloudinary.com/dbej3vdgp/image/upload/v1664800251/College%20Bazaar/userIcon_l7k486.png"}></Avatar>
            </MenuButton>
            <MenuList color={'black'}>
                <MenuOptionGroup defaultValue='asc' title={"User"} type='radio'>
                    <MenuDivider />
                    <MenuItem icon={<MdOutlineAccountCircle className='text-lg' />}>
                        My Account
                    </MenuItem>
                    <MenuItem icon={<MdOutlineSell className='text-lg' />} display='flex' justifyContent={'center'}>
                        My Ads
                    </MenuItem>
                    <MenuItem icon={<FiSettings className='text-lg' />}>
                        Setting
                    </MenuItem>
                    <MenuItem onClick={handleUser} icon={<FiLogOut className='text-lg' />}>
                        Logout
                    </MenuItem>
                </MenuOptionGroup>
            </MenuList>
        </Menu>)
}

//metaData
export const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title> {title} </title>
        </Helmet>)
}

// Green Button
export const ButtonSolid = ({ path, name, }) => {
    return (
        <>
            <a
                href={path}
                className={`mx-1 w-[auto] bg-blue-400 hover:text-blue-400 border-blue-400  active:text-blue-600 space-x-3 font-semibold px-5  p-2 border-2 hover:bg-transparent rounded-md text-white capitalize`}
            >{name}</a>
        </>
    );
};

// red button
export const ButtonGhost = ({ path, name }) => {
    return (
        <>
            {path && <Link
                to={path}
                className={`mx-1 w-[auto] bg-transparent hover:bg-blue-400 text-blue-400 border-blue-400 active:text-blue-600 space-x-3 font-semibold px-5  p-2 border-2  hover:text-white rounded-md capitalize`}
            >
                {name}
            </Link>}

        </>
    );
};

