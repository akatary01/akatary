// third party
import { JSX } from "react"

type WorkProps = JSX.IntrinsicElements["div"] & {
}

export default function Work({...props}: WorkProps) {
    return (
        <div {...props}>
        </div>
    )
}
