
"use client";
import { useRouter } from 'next/navigation'
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModel";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  
  const OnRent = useCallback(()=>{
    if (!currentUser){
      loginModal.onOpen()
    }


    rentModal.onOpen()
  },[currentUser, loginModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
          <div
            onClick={OnRent}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Anuncie o seu Espaço
          </div>
          <div
            onClick={toggleOpen}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition "
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
          </div>
      </div>
      {isOpen && (
        <div
          className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <div className="font-semibold">
                  <MenuItem onClick={() => router.push("/reservations")} label="Reservas" />
                  <MenuItem onClick={() => router.push("/viagens")} label="Viagens" />
                  <MenuItem onClick={() => router.push("/favorites")} label="Favoritos" />
                </div>
                <hr />
                <MenuItem
                  onClick={OnRent}
                  label="Anucie seu espaço no Aribnb"
                />
                <MenuItem onClick={() => {}} label="Indique um Anfitrião" />
                <MenuItem onClick={() => {}} label="Conta" />
                <hr />
                <MenuItem onClick={() => {}} label="Central de Ajudar" />
                <MenuItem onClick={() => signOut()} label="Sair da Conta" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="entrar" />
                <MenuItem onClick={registerModal.onOpen} label="registrar" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
