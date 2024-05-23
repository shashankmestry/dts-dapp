
interface SectionHeaderProps {
    title: string,
    subTitle: string,
    description?: string
} 

const SectionHeader = ({ title, subTitle, description }: SectionHeaderProps) => {
    return (
        <div>
            <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square" aria-hidden="true">
                <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>
                <div className="absolute w-64 h-64 translate-z-0 bg-purple-400 rounded-full blur-[80px] opacity-70"></div>
            </div>
            <div className="text-center pb-6 md:pb-10">
                <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">{subTitle}</div>
                <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">{title}</h1>
                {
                    description && <div className="max-w-3xl mx-auto">
                        <p className="text-lg text-slate-400">{description}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default SectionHeader