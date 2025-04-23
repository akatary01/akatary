// third party
import { JSX } from "react"

type NavProps = JSX.IntrinsicElements["nav"] & {
}

export default function Nav({...props}: NavProps) {
    return (
        <nav {...props}>
        </nav>
    )
}
