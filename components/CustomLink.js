import Link from 'next/link';

const CustomLink = ({href="/", text = 'linkText', className, children}) => {
    return <Link href={href}><a href={href} className={className}>{children ||  text}</a></Link>
}

export default CustomLink
