const SECTIONS = ['work', 'research', 'projects', 'contact'];
class Section {
    static active;
    static init = () => {
        const section = Section.get();
        console.log(`[Section.init] >> selected: ${section}`);
        if (SECTIONS.includes(section)) {
            Section.active = section;
            Section.reveal();
        } 
    }
    static get = () => window.location.href.split("#").at(-1);
    static reveal = () => document.getElementById("cover").classList.add("open-cover");
    static isSelected = section => section === Section.active;
    static select = event => { 
        Section.active = event.target.href.split('#').at(-1); 
        Section.reveal();
        SECTIONS.forEach(section => {
            // assumption: an element exists with id = section.
            const elm = document.getElementById(section);
            if (Section.isSelected(section)) {
                elm.classList.add('active');
            } else {
                elm.classList.remove('active');
            }
        });
    }
}
Section.init();

class DrawingElement extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('ak-drawing-template');
        
        // assumption: template exists
        if (template) {
            // instead of using shadow DOM which makes Alpine.js reactivity complex, 
            // append directly to the light DOM for simpler interop.
            this.appendChild(template.content.cloneNode(true)); 
        } else {
            console.error("[DrawingElement] >> drawing template not found!");
        }
    }
}
// define the custom element 'ak-drawing'
customElements.define('ak-drawing', DrawingElement);