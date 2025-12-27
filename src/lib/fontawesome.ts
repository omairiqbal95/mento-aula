// src/lib/fontawesome.ts
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faUser, faPrint } from "@fortawesome/free-solid-svg-icons";

// Prevent Font Awesome from automatically adding its CSS (Next.js needs manual import)
config.autoAddCss = false;

// Register only the icons you need
library.add(faHouse, faUser, faPrint);
