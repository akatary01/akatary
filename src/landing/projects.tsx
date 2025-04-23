// third party
import { JSX } from "react"

type ProjectsProps = JSX.IntrinsicElements["div"] & {
}

export default function Projects({...props}: ProjectsProps) {
    return (
        <div {...props}>
        </div>
    )
}
