import { JSX } from "react"

type LandingProps = JSX.IntrinsicElements["div"] & {
}

export default function Landing({...props}: LandingProps) {
    return (
        <div {...props}>
            {/* Left art gallery */}

            {/* Book */}

            {/* Right art gallery */}
        </div>
    )
}