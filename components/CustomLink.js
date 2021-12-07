import Link from 'next/link';

const CustomLink = ({href="/", text = 'linkText', className, children, target="_self"}) => {
    return <Link href={href}><a href={href} className={className} target={target}>{children ||  text}</a></Link>
}

export default CustomLink
