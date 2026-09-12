/* ================================
   PORTAFOLIO DE ABEL HUAMÁN
   script.js
   ================================ */

/*
  EDITA SOLO ESTA PARTE CON TUS DATOS REALES.
  GitHub ya está configurado.
*/
const CONFIG = {
  email: "abelhuarey@gmail.com",
  linkedin: "",
  whatsapp: "+51940253586",
  github: "https://github.com/YuriReyHU"
};

const roles = [
  "Python Developer en formación",
  "Estudiante de Ingeniería de Sistemas",
  "Aprendiendo Ciberseguridad",
  "Construyendo proyectos reales"
];

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const typewriter = document.getElementById("typewriter");
const terminalForm = document.getElementById("terminalForm");
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");
const clearTerminal = document.getElementById("clearTerminal");
const emailButton = document.getElementById("emailButton");
const mouseLight = document.getElementById("mouseLight");
const toast = document.getElementById("toast");

/* Menú móvil */
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

/* Año automático */
document.getElementById("currentYear").textContent = new Date().getFullYear();

/* Efecto typewriter */
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typewriter.textContent = current.slice(0, charIndex);

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    charIndex--;
    typewriter.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 34 : 62);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typewriter.textContent = "";
  typeLoop();
} else {
  typewriter.textContent = roles[0];
}

/* Elementos que aparecen al hacer scroll */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

/* Resaltar sección activa en navegación */
const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a[href^='#']")];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navAnchors.forEach((link) => {
        const target = link.getAttribute("href").slice(1);
        link.classList.toggle("active", target === entry.target.id);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

/* Efecto 3D suave en la tarjeta de código */
const tiltCard = document.querySelector(".tilt-card");

if (tiltCard && window.matchMedia("(pointer: fine)").matches) {
  tiltCard.addEventListener("mousemove", (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    tiltCard.style.transform =
      `rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateY(-2px)`;
  });

  tiltCard.addEventListener("mouseleave", () => {
    tiltCard.style.transform = "";
  });
}

/* Toast */
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

/* Botón de correo (compatibilidad si en el futuro vuelves a usar un botón) */
if (emailButton) {
  emailButton.addEventListener("click", () => {
    const subject = encodeURIComponent("Contacto desde tu portafolio");
    const body = encodeURIComponent(
      "Hola Abel,\n\nVi tu portafolio y me gustaría conversar contigo sobre una oportunidad/proyecto.\n"
    );

    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

/* Luz sutil que sigue al cursor: detalle visual, no interfiere con el contenido */
if (mouseLight && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    mouseLight.style.left = `${event.clientX}px`;
    mouseLight.style.top = `${event.clientY}px`;
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    mouseLight.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    mouseLight.style.opacity = ".11";
  });
}

/* Terminal interactiva */
const commandHandlers = {
  help: () => [
    "Comandos disponibles:",
    "  whoami    → quién soy",
    "  skills    → habilidades actuales",
    "  projects  → proyectos",
    "  contact   → formas de contacto",
    "  github    → perfil de GitHub",
    "  education → formación",
    "  clear     → limpiar terminal"
  ].join("\n"),

  whoami: () =>
    "Abel Yuri Josué Huamán Reyes — estudiante de Ingeniería de Sistemas, aprendiendo Python, desarrollo web y ciberseguridad.",

  skills: () =>
    "Python · HTML · CSS · JavaScript básico · Linux · Git/GitHub · Nmap · Wireshark · John the Ripper · Hashcat · Gobuster · FFUF · tcpdump",

  projects: () =>
    "01. python-desde-cero\n02. Prácticas de laboratorio de redes\n03. Este portafolio interactivo",

  education: () =>
    "Ingeniería de Sistemas — aprendizaje continuo con proyectos prácticos y laboratorios.",

  github: () =>
    "GitHub: https://github.com/YuriReyHU",

  contact: () => {
    const lines = ["Puedes contactarme por:"];
    lines.push(`GitHub: ${CONFIG.github}`);

    if (Boolean(CONFIG.email)) {
      lines.push(`Email: ${CONFIG.email}`);
    } else {
      lines.push("Email: pendiente de configurar");
    }

    lines.push(`WhatsApp: ${CONFIG.whatsapp}`);
    return lines.join("\n");
  }
};

function appendTerminalLine(command, response, isError = false) {
  const commandLine = document.createElement("div");
  commandLine.innerHTML =
    '<span class="terminal-green">abel@portfolio</span>:' +
    '<span class="terminal-blue">~</span>$ ' +
    escapeHtml(command);

  const responseLine = document.createElement("div");
  responseLine.className = `terminal-response${isError ? " terminal-error" : ""}`;
  responseLine.textContent = response;

  terminalOutput.append(commandLine, responseLine);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function executeCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();

  if (!command) return;

  if (command === "clear") {
    terminalOutput.innerHTML = "";
    return;
  }

  const handler = commandHandlers[command];

  if (handler) {
    appendTerminalLine(command, handler());
  } else {
    appendTerminalLine(
      command,
      `Comando no encontrado: "${command}". Escribe "help".`,
      true
    );
  }
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  executeCommand(terminalInput.value);
  terminalInput.value = "";
});

clearTerminal.addEventListener("click", () => {
  terminalOutput.innerHTML = "";
  terminalInput.focus();
});

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.dataset.command;
    executeCommand(command);
    terminalInput.focus();
  });
});

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* Easter egg */
console.log(
  "%cHola 👋",
  "font-size: 24px; color: #5fffd1; font-weight: 700;"
);
console.log(
  "Si estás revisando el código, eso ya suma puntos 😄 — Abel.dev"
);
