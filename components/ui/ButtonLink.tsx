import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"
import React, { ReactNode } from "react"

export interface ButtonProps
  extends LinkProps {
  variant?: string,
  children: ReactNode,
  className?: string,
  showArrow?: boolean
}

const variants: {[key:string]: string} = {
    default:
      "btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group disabled:opacity-75",
    transparent:
      "btn text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none disabled:opacity-75",
}

const ButtonLink = ({ children, href, className, variant = 'default', showArrow = true, ...props }: ButtonProps) => {
    return (
        <Link href={href} className={cn(variants[variant], className)} {...props}>
            {children}
            {
              showArrow && <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            }
        </Link>
    )
}


export default ButtonLink