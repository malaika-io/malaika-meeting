import Link from "next/link"
import React from "react";

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
