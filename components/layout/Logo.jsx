import Link from 'next/link'

const Logo = () => {
    return (
        <Link className="inline-flex text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-rose-400 via-purple-600 via-65% to-violet-600 items-baseline" href="/" aria-label="DTS">
            SPAD <span className='text-base'>DTS</span>
        </Link>
    )
}

export default Logo