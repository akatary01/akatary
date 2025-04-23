// custom 
import Nav from "./nav"
import Work from "./work"
import Reseach from "./reseach"
import Contact from "./contact"
import Projects from "./projects"
import { Drawing } from "../components/drawing"

// third party
import { JSX, useState } from "react"

// static data 
import links from "../assets/data/links.json"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type LandingProps = JSX.IntrinsicElements["div"] & {
}

type sectionType = "projects" | "reseach" | "work" | "contact"
export default function Landing({...props}: LandingProps) {
    const [section, setSection] = useState<sectionType>("projects")
    
    return (
        <div {...props}>
            {/* Left art gallery */}
            <div>
                <Drawing src=""/>
                <Drawing src=""/>
            </div>

            {/* Book */}
            <div id="book">
                <Nav />
                <div className="page">
                    {section === "work" && <Work />}
                    {section === "reseach" && <Reseach />}
                    {section === "contact" && <Contact />}
                    {section === "projects" && <Projects />}
                </div>
                <div id="cover">
                    <div>
                        {/** Title */}
                        <div>
                            {Object.entries(links).map(([key, value]) => {
                                return (
                                    <a href={value.href} key={key} className="icon-button">
                                        <FontAwesomeIcon icon={value.icon as IconProp}/>
                                        {/* <span className="tooltip">{value.tooltip}</span> */}
                                    </a>
                                )
                            })}
                        </div>
                        <div>
                            {/** Welcome message */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right art gallery */}
            <div>
                <Drawing src=""/>
                <Drawing src=""/>
                <Drawing src=""/>
            </div>
        </div>
    )
}