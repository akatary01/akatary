// third party
import { JSX } from "react"

type ReseachProps = JSX.IntrinsicElements["div"] & {
}

export default function Reseach({...props}: ReseachProps) {
    return (
        <div {...props}>
        </div>
    )
}
