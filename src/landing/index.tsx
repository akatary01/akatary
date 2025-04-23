import { JSX } from "react"

type LandingProps = JSX.IntrinsicElements["div"] & {
}

export default function Landing({...props}: LandingProps) {
    return (
        <div {...props}>
            {/* Left art gallery */}
            <div></div>
            {/* Book */}
            <div></div>

            {/* Right art gallery */}
            <div></div>
        </div>
    )
}