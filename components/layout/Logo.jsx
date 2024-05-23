import Link from 'next/link'

const Logo = () => {
    return (
        <Link className="inline-flex text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-rose-400 via-purple-600 via-65% to-violet-600" href="/" aria-label="DTS">
            DTS
        </Link>
    )
}

export default Logo