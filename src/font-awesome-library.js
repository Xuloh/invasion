import {config, dom, library} from "@fortawesome/fontawesome-svg-core";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";

export default function setupFontAwesomeLibrary() {
    config.autoReplaceSvg = "nest";
    library.add(faChevronRight);
    dom.watch();
}
