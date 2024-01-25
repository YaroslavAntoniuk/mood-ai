import Link from "next/link";

const links = [
  { href: '/journal', label: 'Journal' },
  { href: '/', label: 'Home' },
];

const LinksList = ({ className = 'flex flex-col' }) => {
  return <ul className={className}>
    {links.map(({ href, label }) => (
      <li key={`${href}${label}`} className='w-full h-[60px] flex items-center justify-center'>
        <Link href={href}>
          <span className='text-xl'>{label}</span>
        </Link>
      </li>
    ))}
  </ul>
}

export default LinksList;