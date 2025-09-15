import type { FooterContent, FAQItem, LegalContent, HelpContent, InstagramShowcaseData, ContactContent, JobVacancy, Page } from '../types';

export const INITIAL_FOOTER_CONTENT: FooterContent = {
  description: "Transformamos espacios con diseños únicos y funcionales, creando ambientes que reflejan tu estilo de vida.",
  socialLinks: [
    { id: 'fb', platform: 'Facebook', url: '#' },
    { id: 'ig', platform: 'Instagram', url: '#' },
    { id: 'yt', platform: 'Youtube', url: '#' },
    { id: 'wa', platform: 'WhatsApp', url: '#' }
  ],
  linkColumns: [
    {
      id: 'col1', title: "Servicios", links: [
        { id: 'l1', text: "Cocinas Personalizadas", url: "Cocinas Personalizadas", linkType: 'project-category' },
        { id: 'l2', text: "Closets y Walk-in", url: "#", linkType: 'url' }, // Example, assuming no direct project category for this
        { id: 'l3', text: "Baños Modernos", url: "Baños Modernos", linkType: 'project-category' },
        { id: 'l4', text: "Muebles a Medida", url: "Muebles a Medida", linkType: 'project-category' },
        { id: 'l5', text: "Mobiliario de Oficina", url: "Mobiliario de Oficina", linkType: 'project-category' },
        { id: 'l6', text: "Proyectos Comerciales", url: "Proyectos Comerciales", linkType: 'project-category' }
      ]
    },
    {
      id: 'col2', title: "Enlaces Rápidos", links: [
        { id: 'l7', text: "Inicio", url: "home", linkType: 'page' },
        { id: 'l8', text: "Quiénes Somos", url: "about-us", linkType: 'page' },
        { id: 'l9', text: "Proyectos", url: "projects", linkType: 'page' },
        { id: 'l10', text: "Blog", url: "blog", linkType: 'page' },
        { id: 'l11', text: "Contacto", url: "contact", linkType: 'page' }
      ]
    }
  ],
  contactInfo: {
    address: "Av. Barceló, CANATOWN, Punta Cana 23000",
    phone: "(849) 456-1963",
    email: "decoragrouppc@gmail.com"
  },
  copyrightText: `© ${new Date().getFullYear()} Decora Group. Todos los derechos reservados.`,
  legalLinks: [
    { id: 'legal1', text: "Política de Privacidad", url: "legal1", linkType: 'legal' },
    { id: 'legal2', text: "Términos y Condiciones", url: "legal2", linkType: 'legal' },
    { id: 'legal3', text: "Aviso Legal", url: "legal3", linkType: 'legal' },
    { id: 'legal4', text: "Política de Cookies", url: "legal4", linkType: 'legal' }
  ]
};

export const INITIAL_VACANCIES: JobVacancy[] = [
    { 
        id: 'job1', 
        title: "Diseñador de Interiores Senior",
        icon: 'DraftingCompass',
        summary: 'Liderar proyectos de diseño desde el concepto hasta la ejecución, creando espacios funcionales y estéticamente excepcionales para clientes residenciales y comerciales.',
        location: 'Punta Cana, Remoto Parcial',
        type: 'Jornada Completa',
        description: [
            'Buscamos un Diseñador de Interiores Senior apasionado y con experiencia para unirse a nuestro equipo dinámico. Serás responsable de gestionar todo el ciclo de vida del diseño, desde la conceptualización inicial y el contacto con el cliente hasta la ejecución final del proyecto.',
            'El candidato ideal tendrá un portafolio sólido que demuestre su creatividad y habilidad técnica, así como excelentes habilidades de comunicación para transformar las visiones de los clientes en realidades tangibles.'
        ],
        responsibilities: [
            'Reunirse con clientes para determinar sus necesidades, presupuesto y preferencias.',
            'Desarrollar conceptos de diseño, bocetos, planos y modelos 3D.',
            'Seleccionar materiales, mobiliario, acabados y paletas de colores.',
            'Coordinar con el equipo de producción y proveedores para asegurar la calidad y los plazos.',
            'Supervisar la instalación y el montaje final del proyecto.'
        ],
        requirements: [
            'Más de 5 años de experiencia demostrable en diseño de interiores.',
            'Portafolio sólido de proyectos completados.',
            'Dominio de software de diseño (AutoCAD, SketchUp, V-Ray, Adobe Creative Suite).',
            'Excelentes habilidades de comunicación y gestión de clientes.',
            'Conocimiento de materiales, construcción y normativas locales.'
        ]
    },
    { 
        id: 'job2', 
        title: "Ebanista / Carpintero Experto",
        icon: 'Wrench',
        summary: 'Fabricar muebles a medida de alta calidad, interpretando planos técnicos y utilizando tanto técnicas tradicionales como maquinaria moderna para lograr acabados impecables.',
        location: 'Taller en Punta Cana',
        type: 'Jornada Completa',
        description: [
            'Estamos en la búsqueda de un Ebanista / Carpintero con un alto nivel de habilidad y atención al detalle. Serás una pieza clave en nuestro taller, responsable de dar vida a los diseños de nuestros clientes y arquitectos.',
            'Este rol requiere una profunda comprensión de la madera y otros materiales, así como la capacidad de trabajar de forma autónoma y en equipo para producir piezas de mobiliario excepcionales.'
        ],
        responsibilities: [
            'Leer e interpretar planos de diseño y especificaciones técnicas.',
            'Operar maquinaria de carpintería (sierras, tupís, CNC, etc.) de forma segura y eficiente.',
            'Construir, ensamblar y acabar muebles a medida con altos estándares de calidad.',
            'Realizar trabajos de acabado como lijado, teñido, lacado y barnizado.',
            'Mantener un espacio de trabajo limpio, seguro y organizado.'
        ],
        requirements: [
            'Más de 7 años de experiencia como ebanista o carpintero de muebles finos.',
            'Habilidad experta en el uso de herramientas manuales y maquinaria de carpintería.',
            'Capacidad para leer e interpretar planos complejos.',
            'Atención meticulosa al detalle y al control de calidad.',
            'Pasión por la artesanía y el trabajo bien hecho.'
        ]
    },
];

export const INITIAL_CUSTOM_PAGES: Page[] = [
  {
    id: 'about-us-page',
    title: 'Quiénes Somos',
    slug: 'about-us',
    isVisibleInHeader: false, // It's in the top bar, not main nav
    isVisibleInFooter: true,
    sections: [
      {
        id: crypto.randomUUID(),
        type: 'history',
        content: {
          title: 'Nuestra Historia',
          text: 'Desde nuestros humildes comienzos hasta convertirnos en un referente del diseño y la fabricación de muebles en Punta Cana, nuestra pasión por la artesanía y la calidad ha sido el motor de nuestro crecimiento. Creemos en la creación de espacios que no solo son hermosos, sino también funcionales y duraderos.',
          images: [
            { id: 'img1', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600', alt: 'Artesano trabajando en un taller de carpintería' },
            { id: 'img2', url: 'https://images.unsplash.com/photo-1556761175-b413da4b248a?q=80&w=600', alt: 'Bocetos y planos de diseño de muebles sobre una mesa' },
            { id: 'img3', url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600', alt: 'Sala de estar elegante con un proyecto de muebles finalizado' },
            { id: 'img4', url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=600', alt: 'El equipo de Decora Group colaborando en un proyecto' },
          ],
        }
      },
      {
        id: crypto.randomUUID(),
        type: 'timeline',
        content: {
          title: 'Nuestra Trayectoria',
          events: [
            { id: 't1', year: 2018, description: "Nace Decora Group con la visión de transformar espacios en Punta Cana." },
            { id: 't2', year: 2019, description: "Inauguramos nuestro primer taller de fabricación, combinando tecnología y artesanía." },
            { id: 't3', year: 2021, description: "Expandimos nuestros servicios para incluir proyectos comerciales y de hotelería." },
            { id: 't4', year: 2023, description: "Lanzamos nuestra plataforma digital para ofrecer una experiencia de cotización innovadora." },
          ]
        }
      },
      {
        id: crypto.randomUUID(),
        type: 'missionVision',
        content: {
          mission: { title: 'Misión', text: 'Crear muebles y espacios que inspiren la vida cotidiana, combinando diseño innovador, funcionalidad excepcional y artesanía de la más alta calidad para superar las expectativas de nuestros clientes.' },
          vision: { title: 'Visión', text: 'Ser la empresa líder en diseño y fabricación de mobiliario a medida en el Caribe, reconocida por nuestra excelencia, sostenibilidad y por transformar las ideas de nuestros clientes en realidades tangibles y duraderas.' }
        }
      },
      {
        id: crypto.randomUUID(),
        type: 'values',
        content: {
          title: 'Nuestros Valores',
          subtitle: 'Los principios que guían cada uno de nuestros proyectos y decisiones.',
          values: [
            { id: 'v1', icon: "Check", title: "Calidad y Excelencia", description: "Nos comprometemos a utilizar los mejores materiales y la artesanía más fina para entregar productos que superan los más altos estándares." },
            { id: 'v2', icon: "Heart", title: "Pasión por el Diseño", description: "El diseño está en el corazón de todo lo que hacemos. Creamos piezas que son funcionales, hermosas y que inspiran la vida cotidiana." },
            { id: 'v3', icon: "Scale", title: "Integridad y Transparencia", description: "Operamos con honestidad y claridad en cada interacción, construyendo relaciones de confianza con nuestros clientes, socios y equipo." },
            { id: 'v4', icon: "Leaf", title: "Sostenibilidad", description: "Estamos dedicados a prácticas responsables, utilizando materiales sostenibles y procesos que minimizan nuestro impacto en el medio ambiente." },
          ]
        }
      },
      {
        id: crypto.randomUUID(),
        type: 'team',
        content: {
          title: 'Conoce a Nuestro Equipo',
          subtitle: 'El talento y la dedicación detrás de cada proyecto exitoso.',
          members: [
            { id: 'tm1', name: "Juan Pérez", role: "CEO y Fundador", imageUrl: "https://i.pravatar.cc/150?img=1" },
            { id: 'tm2', name: "María González", role: "Directora de Diseño", imageUrl: "https://i.pravatar.cc/150?img=2" },
            { id: 'tm3', name: "Carlos Rodríguez", role: "Jefe de Producción", imageUrl: "https://i.pravatar.cc/150?img=3" },
            { id: 'tm4', name: "Ana Martínez", role: "Gerente de Proyectos", imageUrl: "https://i.pravatar.cc/150?img=4" },
          ]
        }
      },
      {
        id: crypto.randomUUID(),
        type: 'hiring',
        content: {
          title: '¿Necesitas Empleo? ¡Estamos Contratando!',
          text: 'Únete a nuestro equipo de apasionados por el diseño y la artesanía. Buscamos talento para seguir creciendo juntos.',
          vacancies: INITIAL_VACANCIES,
          closingText: '¿No ves una posición para ti? Siempre estamos buscando personas con talento. \n Envíanos tu currículum a nuestro correo electrónico.'
        }
      }
    ]
  }
];

export const INITIAL_FAQ_CONTENT: { title: string; subtitle: string; faqs: FAQItem[] } = {
    title: 'Preguntas Frecuentes',
    subtitle: 'Encuentra respuestas a las dudas más comunes sobre nuestros productos, servicios y procesos.',
    faqs: [
        { id: 'faq1', question: '¿Cuál es el tiempo de entrega de los muebles?', answer: 'El tiempo de entrega varía según el producto y la personalización. Generalmente, oscila entre 15 y 45 días laborables. Puedes ver el tiempo estimado en la página de cada producto.' },
        { id: 'faq2', question: '¿Ofrecen servicio de diseño de interiores completo?', answer: 'Sí, ofrecemos un servicio integral de diseño de interiores, desde la conceptualización hasta la ejecución y el amueblamiento final. Nuestro equipo de diseñadores trabajará contigo para crear el espacio de tus sueños.' },
        { id: 'faq3', question: '¿Qué garantía tienen sus productos?', answer: 'Todos nuestros muebles tienen una garantía de 365 días que cubre defectos de fabricación. La calidad y durabilidad son nuestra prioridad.' },
        { id: 'faq4', question: '¿Puedo personalizar los muebles?', answer: '¡Por supuesto! La personalización es nuestra especialidad. Puedes elegir materiales, acabados, colores y dimensiones en la mayoría de nuestros productos. Contacta a nuestro equipo para discutir tus ideas.' }
    ]
};

export const INITIAL_LEGAL_CONTENT: LegalContent = {
    pages: [
        { 
            id: 'legal1', 
            title: 'Política de Privacidad', 
            content: `
Fecha de última actualización: ${new Date().toLocaleDateString('es-DO')}

Decora Group ("nosotros", "nuestro") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web.

**1. RECOPILACIÓN DE INFORMACIÓN**
Recopilamos información personal que usted nos proporciona voluntariamente, como nombre, dirección de correo electrónico, número de teléfono y dirección, cuando completa formularios de contacto o cotización.

**2. USO DE SU INFORMACIÓN**
Usamos la información recopilada para:
- Responder a sus solicitudes y consultas.
- Procesar sus cotizaciones y pedidos.
- Enviarle información sobre nuestros productos y servicios.
- Mejorar nuestro sitio web y servicios.

**3. DIVULGACIÓN DE SU INFORMACIÓN**
No vendemos, intercambiamos ni transferimos de ningún otro modo a terceros su información de identificación personal sin su consentimiento, excepto para cumplir con la ley o proteger nuestros derechos.

**4. SEGURIDAD DE LA INFORMACIÓN**
Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal.

**5. DERECHOS DEL USUARIO**
Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos en info@decoragroup.pc.

**6. POLÍTICA DE COOKIES**
Nuestro sitio web puede utilizar "cookies" para mejorar la experiencia del usuario. Puede optar por configurar su navegador para que rechace las cookies.
            ` 
        },
        { 
            id: 'legal2', 
            title: 'Términos y Condiciones', 
            content: `
Bienvenido a Decora Group. Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.

**1. USO DEL SITIO**
El contenido de las páginas de este sitio web es para su información y uso general. Está sujeto a cambios sin previo aviso.

**2. PROPIEDAD INTELECTUAL**
Este sitio web contiene material que es de nuestra propiedad o está licenciado para nosotros. Este material incluye, pero no se limita a, el diseño, la disposición, el aspecto, la apariencia y los gráficos. La reproducción está prohibida salvo de conformidad con el aviso de derechos de autor.

**3. EXENCIÓN DE RESPONSABILIDAD**
La información en este sitio web se proporciona "tal cual". No ofrecemos ninguna garantía en cuanto a la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales que se encuentran u ofrecen en este sitio web para un propósito particular. El uso de cualquier información o material en este sitio web es bajo su propio riesgo.

**4. ENLACES A TERCEROS**
Este sitio web puede incluir enlaces a otros sitios web. Estos enlaces se proporcionan para su conveniencia para proporcionar más información. No significan que respaldamos el (los) sitio(s) web. No tenemos ninguna responsabilidad por el contenido del (los) sitio(s) web enlazado(s).

**5. LEY APLICABLE**
Su uso de este sitio web y cualquier disputa que surja de dicho uso del sitio web está sujeto a las leyes de la República Dominicana.
            `
        },
        { 
            id: 'legal3', 
            title: 'Aviso Legal', 
            content: `
En cumplimiento con el deber de información, a continuación se reflejan los siguientes datos:

**1. DATOS IDENTIFICATIVOS DE LA EMPRESA**
- **Nombre comercial:** Decora Group
- **Razón Social:** [Razón Social de la Empresa S.R.L.]
- **RNC:** [Número de RNC]
- **Domicilio:** CANATOWN Plaza & Centro de Logística, Av. Barceló, local 101, Veron, Punta Cana 23000, República Dominicana.
- **Correo electrónico de contacto:** info@decoragroup.pc
- **Teléfono:** (849) 456-1963

**2. OBJETO DEL SITIO WEB**
El presente sitio web tiene como objeto la promoción y comercialización de muebles, servicios de diseño de interiores y proyectos de carpintería a medida.

**3. USUARIOS**
El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, los Términos y Condiciones de Uso aquí reflejados.
            `
        },
        {
            id: 'legal4',
            title: 'Política de Cookies',
            content: `
**¿QUÉ SON LAS COOKIES?**
Una cookie es un pequeño fichero de texto que un sitio web guarda en su ordenador o dispositivo móvil cuando usted visita el sitio. Esto permite que el sitio web recuerde sus acciones y preferencias (como inicio de sesión, idioma, tamaño de letra y otras preferencias de visualización) durante un período de tiempo, para que no tenga que volver a introducirlas cada vez que regrese al sitio o navegue de una página a otra.

**¿CÓMO UTILIZAMOS LAS COOKIES?**
Utilizamos cookies para:
- **Cookies técnicas:** Son esenciales para el funcionamiento del sitio web, como mantener su sesión iniciada.
- **Cookies de análisis:** Nos permiten reconocer y contar el número de visitantes y ver cómo se mueven por el sitio. Utilizamos esta información para mejorar el funcionamiento de nuestro sitio web. (Ej: Google Analytics).
- **Cookies de personalización:** Se utilizan para reconocerle cuando vuelve a nuestro sitio web. Esto nos permite personalizar nuestro contenido para usted y recordar sus preferencias.

**CÓMO CONTROLAR LAS COOKIES**
Puede controlar y/o eliminar las cookies como desee. Para más información, consulte aboutcookies.org. Puede eliminar todas las cookies que ya están en su ordenador y puede configurar la mayoría de los navegadores para que impidan su instalación. Sin embargo, si lo hace, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y que algunos servicios y funcionalidades no funcionen.
            `
        }
    ]
};

export const INITIAL_HELP_CONTENT: HelpContent = {
    title: 'Centro de Ayuda y Guía',
    subtitle: 'Encuentra todo lo que necesitas saber para sacar el máximo provecho a nuestra plataforma y servicios.',
    userTopics: [
        {
            id: 'user_quote_auto',
            title: '¿Cómo funciona el cotizador automático?',
            content: 'Nuestro cotizador automático te permite obtener un precio estimado para proyectos específicos como Closets, TV Walls y Cocinas. Simplemente sigue los pasos, selecciona las opciones que se adapten a tus necesidades (tamaño, estilo, materiales, accesorios) y al final obtendrás un presupuesto detallado. Recuerda que este es un precio estimado y puede variar ligeramente tras la visita técnica final.'
        },
        {
            id: 'user_quote_custom',
            title: '¿Cómo pido cotización para un mueble personalizado?',
            content: 'Para muebles a medida, proyectos comerciales o cualquier otro diseño que tengas en mente, puedes contactarnos a través de nuestro formulario en la página de "Contacto". Asegúrate de darnos la mayor cantidad de detalles posible (medidas, fotos de inspiración, materiales deseados) y uno de nuestros diseñadores se pondrá en contacto contigo.'
        },
        {
            id: 'user_wishlist',
            title: '¿Para qué sirve la "Lista de Deseos"?',
            content: 'La Lista de Deseos (marcada con un corazón ♥) te permite guardar los productos que más te gustan en un solo lugar. Es una forma fácil de no perder de vista tus muebles favoritos mientras exploras nuestro catálogo. Puedes acceder a tu lista en cualquier momento desde el icono de corazón en la parte superior de la página.'
        },
        {
            id: 'user_cart',
            title: '¿Qué es el "Carrito de Cotización"?',
            content: 'El carrito (icono 🛒) no es para una compra directa, sino para agrupar todos los productos de los que deseas recibir una cotización formal. Añade todo lo que te interese, y cuando estés listo, ve al carrito para enviarnos tu solicitud con todos los productos juntos. Esto agiliza el proceso y nos ayuda a darte un presupuesto más preciso.'
        },
    ],
    adminTopics: [
        { id: 'admin_dashboard', section: 'Principal', icon: 'LayoutDashboard', title: 'Dashboard', content: 'El Dashboard es tu punto de partida. Te ofrece un resumen visual rápido de las métricas más importantes de tu sitio, como el número total de productos, proyectos y páginas. Es ideal para tener una visión general del estado de tu contenido de un solo vistazo.' },
        { id: 'admin_analytics', section: 'Principal', icon: 'BarChart2', title: 'Analíticas', content: 'Esta sección te proporciona datos sobre el tráfico de tu web. Podrás ver (próximamente) información sobre el número de visitas, de dónde vienen tus usuarios (geografía) y qué páginas son las más populares. Es como tener un mini Google Analytics integrado.' },
        { id: 'admin_media', section: 'Principal', icon: 'HardDrive', title: 'Archivos y Multimedia', content: 'Aquí se centralizan todas las imágenes y archivos de tu web. Puedes ver las imágenes usadas en productos, sliders, proyectos, etc. Además, puedes subir nuevos archivos directamente a esta biblioteca para usarlos más tarde en cualquier parte del sitio.' },
        { id: 'admin_audit', section: 'Principal', icon: 'ShieldCheck', title: 'Auditoría', content: 'El registro de auditoría (próximamente) te mostrará un historial de los cambios importantes realizados en el panel de administración. Podrás ver quién hizo qué cambio y cuándo, lo que es crucial para la seguridad y el seguimiento del trabajo en equipo.' },
        { id: 'admin_pages', section: 'Contenido del Sitio', icon: 'FileText', title: 'Páginas y Secciones', content: 'Este es el corazón del contenido de tu web. Desde aquí puedes editar páginas como "Quiénes Somos", "FAQ" o "Contacto". Utiliza un sistema de bloques para añadir, eliminar, reordenar y editar las distintas secciones que componen cada página, dándote control total sobre la estructura.' },
        { id: 'admin_slider', section: 'Contenido del Sitio', icon: 'ImageIcon', title: 'Slider Principal', content: 'Gestiona las grandes imágenes rotativas que aparecen en la parte superior de tu página de inicio. Puedes cambiar las imágenes, los títulos, subtítulos y los botones de cada diapositiva. También puedes reordenarlas o eliminarlas.' },
        { id: 'admin_popular', section: 'Contenido del Sitio', icon: 'Star', title: 'Categorías Populares', content: 'Controla las cuatro categorías destacadas que aparecen en la página de inicio. Puedes cambiar cuáles categorías se muestran, sus imágenes y el texto que las acompaña para dirigir la atención de los usuarios a las secciones más importantes.' },
        { id: 'admin_services', section: 'Contenido del Sitio', icon: 'LayoutList', title: 'Servicios', content: 'Edita la sección de servicios que aparece en la página de inicio. Cada servicio tiene un título, descripción, imagen y un botón que puede enlazar a un tipo de cotización específico. Es ideal para destacar tus principales áreas de negocio.' },
        { id: 'admin_projects', section: 'Contenido del Sitio', icon: 'Briefcase', title: 'Proyectos', content: 'Aquí puedes añadir, editar o eliminar los proyectos de tu portafolio. Cada proyecto tiene un título, descripción, categoría, imagen principal y una galería de imágenes para mostrar tu trabajo en detalle.' },
        { id: 'admin_products', section: 'Contenido del Sitio', icon: 'Package', title: 'Productos', content: 'Gestiona todo tu inventario de productos. Puedes crear nuevos productos, editar los existentes (precio, descripción, imágenes, etc.), y controlar su visibilidad o disponibilidad en la tienda. También incluye herramientas para aplicar aumentos o descuentos de precio de forma masiva.' },
        { id: 'admin_catalogues', section: 'Contenido del Sitio', icon: 'BookCopy', title: 'Catálogos', content: 'Administra tus catálogos. Puedes crear dos tipos: "Tipo Post" para enlazar a un PDF, una galería o un archivo de Drive, o "Basado en Productos" para usar el diseñador avanzado y generar un PDF personalizado a partir de tu inventario.' },
        { id: 'admin_blog', section: 'Contenido del Sitio', icon: 'BookOpen', title: 'Blog', content: 'Gestiona todo el contenido de tu blog. Puedes escribir y editar publicaciones, así como administrar las categorías y etiquetas para mantener tu contenido organizado y fácil de navegar para los usuarios.' },
        { id: 'admin_settings', section: 'Configuración', icon: 'Settings', title: 'Ajustes Generales', content: 'Aquí configuras los elementos globales de tu sitio: cambia los logos del encabezado y pie de página, edita los textos de la barra superior (como "Entrega gratis"), y ajusta la tasa de cambio de USD a RD$.' },
        { id: 'admin_menu', section: 'Configuración', icon: 'LayoutList', title: 'Menú Principal', content: 'Controla la estructura de la navegación principal de tu web. Puedes añadir, eliminar, renombrar y reordenar las categorías principales. También puedes gestionar las subcategorías que aparecen en los mega menús desplegables.' },
        { id: 'admin_footer', section: 'Configuración', icon: 'Anchor', title: 'Pie de Página', content: 'Edita toda la información que aparece en el pie de página: la descripción de la empresa, los enlaces a redes sociales, las columnas de enlaces rápidos y la información de contacto.' },
        { id: 'admin_quote', section: 'Configuración', icon: 'Calculator', title: 'Cotizador', content: 'Configura las opciones y precios del cotizador automático. Puedes gestionar los estilos para TV Walls, los tipos y módulos de closets, y todas las opciones para cocinas (tamaños, topes, accesorios, etc.).' },
        { id: 'admin_process', section: 'Configuración', icon: 'Briefcase', title: 'Proceso de Trabajo', content: 'Edita la sección "Proceso de Trabajo" de la página de inicio. Puedes cambiar el título, la imagen de fondo y gestionar los 4 pasos que describen cómo trabajas con los clientes.' },
        { id: 'admin_vacancies', section: 'Configuración', icon: 'Briefcase', title: 'Vacantes de Empleo', content: 'Gestiona las ofertas de trabajo que aparecen en la página "Quiénes Somos". Puedes crear nuevas vacantes, editar las existentes y eliminar las que ya no están disponibles. Cada vacante tiene campos detallados para descripción, responsabilidades y requisitos.' },
        { id: 'admin_help', section: 'Configuración', icon: 'HelpCircle', title: 'Ayuda y Guía', content: 'Desde aquí editas el contenido de la página de ayuda para usuarios y la guía para administradores (¡la que estás leyendo ahora!). Puedes añadir, editar o eliminar artículos para mantener ambas guías actualizadas.' },
        { id: 'admin_integrations', section: 'Configuración', icon: 'Link2', title: 'Integraciones', content: 'Gestiona la apariencia de las secciones que se integran con servicios de terceros. Actualmente, puedes editar toda la información que se muestra en la sección de Instagram en la página de inicio (nombre de usuario, bio, fotos, etc.).' },
    ]
};

export const INITIAL_CONTACT_CONTENT: ContactContent = {
    formTitle: 'Envíanos un Mensaje',
    formSubtitle: 'Completa el formulario y nos pondremos en contacto contigo.',
    infoTitle: 'Información de Contacto',
    phone: '(849) 456-1963',
    email: 'decoragrouppc@gmail.com',
    address: 'Av. Barceló, CANATOWN, Punta Cana 23000',
    hours: 'Lunes - Viernes: 9:00 AM - 6:00 PM | Sábados: 9:00 AM - 4:00 PM | Domingos: Cerrado',
    mapTitle: 'Nuestra Ubicación'
};

export const INITIAL_INSTAGRAM_SHOWCASE_DATA: InstagramShowcaseData = {
    username: 'decoragroup.pc',
    isVerified: true,
    profilePictureUrl: 'https://decoragrouppuntacana.com/icon.png',
    postsCount: 99,
    followersCount: '2,783',
    followingCount: 366,
    profileName: 'Decora Group',
    bio: 'Fabrica de modulares de cocina, puertas, closets, baños, para proyectos. Equipamos y decoramos tus espacios interiores. 📍Punta Cana, Rep. Dominicana.',
    galleryImages: [
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=400&h=400&auto=format&fit=crop' },
        { id: crypto.randomUUID(), imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&h=400&auto=format&fit=crop' },
    ]
};
