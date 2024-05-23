"use client";

import Link from 'next/link'
import React from 'react'
import { UrlObject } from 'url';

interface CardProps {
    children: React.ReactNode,
    href?: string | UrlObject,
}

const Card = ({ href, children }: CardProps) => {
    return (
        <div className="bg-gradient-to-tr from-slate-800 to-slate-800/25 rounded-3xl border border-slate-700/25 hover:border-slate-700/60 transition-colors group relative">
            <div className="flex flex-col p-5 h-full">
                {children}
                { href && <Link className="group-hover:before:absolute group-hover:before:inset-0" href={href}></Link> }
            </div>
        </div>
    )
}

export default Card