// third party
import { JSX } from "react"

type ContactProps = JSX.IntrinsicElements["form"] & {
}

export default function Contact({...props}: ContactProps) {
    return (
        <form {...props}>
        </form>
    )
}
