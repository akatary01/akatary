const SECTIONS = [
    'projects',
    'work',
    'research',
    'contact',
];
const COVER_ID = "cover";

class Section {
    static active = COVER_ID;
    static init = async () => {
        const section = Section.get();
        console.log(`[Section.init] >> selected: ${section}`);

        let content = "";
        if (SECTIONS.includes(section)) {
            content = await (await fetch(`sections/${section}.html`)).text();
        }
            
        // load selected section immediately
        [
            projectsSection,
            workSection, 
            researchSection, 
            contactSection,
        ] = await Promise.all(
            SECTIONS.map(s => s !== section ? "" : content)
        );

        if (SECTIONS.includes(section)) {
            Section.active = section;
            Section.select(section);
            Section.reveal();
        }
        
        // load all sections in the background
        [
            projectsSection,
            workSection, 
            researchSection, 
            contactSection,
        ] = await Promise.all(
            SECTIONS.map(
                    s => s !== section ? fetch(`sections/${s}.html`).then(res => res.text()) : content
                )
            );
    }
    static get = () => window.location.href.split("#").at(-1);
    static hide = () => {
        document.getElementById(COVER_ID).classList.remove("open-cover");
        document.getElementById(COVER_ID).classList.add("close-cover");
    }
    static reveal = () => {
        document.getElementById(COVER_ID).classList.remove("close-cover");
        document.getElementById(COVER_ID).classList.add("open-cover");
    }
    static isSelected = section => section === Section.active;
    static select = section => { 
        const closeCover = document.getElementById("closeCover");
        if (section === COVER_ID) {
            if (!Section.isSelected(section)) {
                Section.hide();
                closeCover.classList.add("active");
            }
        } else {
            Section.reveal();
            closeCover.classList.remove("active");
        }
        Section.active = section; 
        
        SECTIONS.forEach(section => {
            // assumption: an element exists with id = section.
            const elm = document.getElementById(section);
            if (Section.isSelected(section)) {
                elm.classList.add('active');
                switch (section) {
                    case 'work':
                        PAGE.innerHTML = workSection;
                        break;
                    case 'research':
                        PAGE.innerHTML = researchSection;
                        break;
                    case 'projects':
                        PAGE.innerHTML = projectsSection;
                        break;
                    case 'contact':
                        PAGE.innerHTML = contactSection;
                        break;
                    default:
                        throw new Error(`[Section.select] >> unknown section: ${section}`);
                }
            } else {
                elm.classList.remove('active');
            }
        });
    }
}

class CustomElement extends HTMLElement {
    constructor(id) {
        super();
        console.log(`[CustomElement] >> initializing with template id: ${id}`);
        const template = document.getElementById(id);
        
        // assumption: template exists
        if (template) {
            // instead of using shadow DOM which makes Alpine.js reactivity complex, 
            // append directly to the light DOM for simpler interop.
            this.appendChild(template.content.cloneNode(true)); 
        } else {
            console.error("[CustomElement] >> template not found!");
        }
    }
}

class DrawingElement extends CustomElement {
    constructor() {
        super('ak-drawing-template');
    }
}

class IconElement extends CustomElement {
    constructor() {
        super('ak-icon-template');
    }
} 

async function sendMessage(event) {
    const [name, email, message] = [
        document.getElementById("contactName").value,
        document.getElementById("contactEmail").value,
        document.getElementById("contactMessage").value,
    ];
    
    // if any field is empty, do nothing
    if (!name || !email || !message) {
        return;
    }
    
    const icon = event.target;
    icon.classList.add("send-message");

    let url = `https://akatary.com/api/mail/contact`;
    const args = { 
        name,
        email,
        message,
        fromEmail: "akatary23@google.com",
        fromEmailConfirm: "akatary23@google.com",
        reciepientEmails: ["akatary23@google.com"],
        subject: "New contact form message from akatary.com",
    }

    url += "?";
    for (const [arg, value] of Object.entries(args)) {
        url += `${arg}=${value}&`
    }

    response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        icon.classList.remove("fa-circle-chevron-right");
        icon.classList.add("fa-circle-check", "success");
    } else {
        icon.classList.remove("fa-circle-chevron-right");
        icon.classList.add("fa-circle-xmark", "error");
    }

    setTimeout(() => {
        icon.classList.remove("send-message");
        icon.classList.remove("fa-circle-check", "success");
        icon.classList.remove("fa-circle-xmark", "error");
        icon.classList.add("fa-circle-chevron-right");
    }, 3500);
}

// define the custom element 'ak-drawing'
customElements.define('ak-drawing', DrawingElement);

let PAGE;

let workSection;
let contactSection;
let projectsSection;
let researchSection;

window.onload = async () => {
    PAGE = document.getElementById('page');           
    Section.init();
}
