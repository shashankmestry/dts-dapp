import { cn } from "@/lib/utils"
import React from "react"
import { CgSpinner } from "react-icons/cg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string,
  showArrow?: boolean,
  isLoading?: boolean
}

const variants: {[key:string]: string} = {
    default:
      "btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group disabled:opacity-75",
    transparent:
      "btn text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none disabled:opacity-75",
}

const Button = ({ children, className, variant = 'default', showArrow = true, isLoading = false, ...props }: ButtonProps) => {
    return (
        <button className={cn(variants[variant], className)} {...props}>
            {children}
            {
                isLoading ? <CgSpinner className="ml-2 h-5 w-5 animate-spin"/> : (<>{
                    showArrow && <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                }</>)
            }
            
        </button>
    )
}


export default Button