import Link from "next/link"

const Button = ({ link, cta }) => (
  <>
      <Link href={link} >
        <a >
          <button className="button is-link is-rounded">{ cta }</button>      
        </a>
      </Link>

  </>
)

export default Button
