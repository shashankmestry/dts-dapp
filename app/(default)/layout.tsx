'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Particles from '@/components/layout/particles'
import Image from 'next/image'
import Illustration from '@/public/images/page-illustration.svg'

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode
}) {

    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 1000,
            easing: 'ease-out-cubic',
        })
    })

    return (
        <>
            <Header />
            <main className="grow">
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <Particles className="absolute inset-0 -z-10" />
                    <div className="md:block absolute left-1/2 -translate-x-1/2 -mt-16 blur-2xl opacity-90 pointer-events-none -z-10" aria-hidden="true">
                            <Image src={Illustration} className="max-w-none" width={1440} height={427} alt="Page Illustration" />
                    </div>
                    <div className="pt-20 pb-16 md:pt-32 md:pb-32">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
