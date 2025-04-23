// third party
import { JSX } from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// css stylesheets
import "../assets/css/art.css"

type DrawingProps = JSX.IntrinsicElements["img"] & {
    containerProps?: JSX.IntrinsicElements["div"] 
}

export function Drawing({containerProps: {className = "", ...containerProps} = {}, ...props}: DrawingProps) {
    return (
        <div className={`drawing ${className}"`} {...containerProps}>
            <FontAwesomeIcon 
                className={`pin absolute circle shadow`}
                icon={"fa-solid fa-circle" as IconProp} 
            />
            <img {...props}/>
        </div>
    )
}
