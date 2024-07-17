"use client"

import { usePathname , useRouter} from "next/navigation";


export const SidebarItem=({href,title,icon}:{
    href: string;
    title: string;
    icon: React.ReactNode
})=>{
    const pathName=usePathname();
    const router=useRouter();
    const selected=pathName===href

    return (
      <div onClick={()=>{
        router.push(href)
      }} className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} p-2 pl-8`}>
        <div className="pr-2">{icon}</div>

        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
      </div>
    );
}