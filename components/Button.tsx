import Link from "next/link"

interface buttonProps {
  link: string,
  cta: string
}

const Button = ({ link, cta }: buttonProps) => (
  <>
      <Link href={link} >
        <a >
          <button className="button is-link is-rounded">{ cta }</button>      
        </a>
      </Link>

  </>
)

export default Button