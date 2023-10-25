'use client';

import Container from "../Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBoatFishing, GiCampingTent, GiCastle, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaPersonSkiing } from "react-icons/fa6";

export const categories = [
  {
    label: "Praia",
    icon: TbBeach,
    description: "propriedade para fechar o beach",
  },
  {
    label: "Chalé",
    icon: GiWindmill,
    description: "propriedade tem o Windmill",
  },
  {
    label: "Moderno",
    icon: MdOutlineVilla,
    description: "propriedade moderna",
  },
  {
    label: "Interior",
    icon: TbMountain,
    description: "Interior da cidade",
  },
  {
    label: "Piscinas",
    icon: TbPool,
    description: "Se divirta com piscinas",
  },
  {
    label: "Ilhas",
    icon: GiIsland,
    description: "Ilhas magníficas",
  },
  {
    label: "Lago",
    icon: GiBoatFishing,
    description: "Propriedade próxima ao rio",
  },
  {
    label: "Equiar",
    icon: FaPersonSkiing,
    description: "Esquie em lugares maravilhosos",
  },
  {
    label: "Castelos",
    icon: GiCastle,
    description: "Construções enormes",
  },
  {
    label: "Acampar",
    icon: GiCampingTent,
    description: "Ótimos lugares para acampar",
  }
];
const Categories = () => {

    const params = useSearchParams();
    const category = params?.get('category')
    const pathname = usePathname()

    const isMainPage = pathname === '/';


    if(!isMainPage){
        return null;
    }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item)=>(
            <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
            />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
