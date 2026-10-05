export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "tech" | "regie" | "strategy";
  categoryLabel: string;
  date: string;
  readTime: number;
  cover: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "reussir-hybridation-congres-medical-afrique",
    title: "Comment réussir l'hybridation d'un congrès médical en Afrique ?",
    excerpt:
      "Liaisons internet redondantes, régie multi-flux et engagement des participants distants : les facteurs clés pour un congrès hybride sans incident.",
    category: "tech",
    categoryLabel: "Technologie & Streaming",
    date: "15 Janvier 2026",
    readTime: 6,
    cover:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Dr. K. Brou",
      role: "Conseiller Technique Médical",
    },
    content: [
      "Depuis la transition post-pandémique, le format hybride s'est imposé comme un standard incontournable pour les sociétés savantes africaines. Permettre à des praticiens en région ou dans d'autres pays du continent de suivre des interventions majeures sans contrainte de déplacement est une avancée démocratique majeure.",
      "Cependant, la réussite technique d'un streaming médical ne tolère aucune approximation. Contrairement à un webinaire d'entreprise, un congrès de chirurgie ou de cardiologie implique des transmissions haute résolution de courbes ECG, d'angiographies et d'actes opératoires en direct.",
      "Le premier pilier est l'agrégation de connexions internet (bonding) : combiner fibre dédiée et routeurs 4G/5G multi-opérateurs afin qu'aucune baisse de débit n'interrompe la retransmission. Le second est l'interactivité : intégrer un modérateur dédié aux questions des congressistes distants pour qu'ils ne soient pas de simples spectateurs passifs.",
    ],
  },
  {
    slug: "regie-scientifique-clef-de-voute-congres-fluide",
    title: "Régie scientifique : la clé de voûte d'un congrès sans accroc",
    excerpt:
      "Gestion des abstracts, centralisation des présentations PowerPoint et synchronisation des salles : découvrez le rôle invisible mais crucial du régisseur scientifique.",
    category: "regie",
    categoryLabel: "Régie Scientifique",
    date: "28 Février 2026",
    readTime: 5,
    cover:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Équipe Régie BAFIK",
      role: "Coordination Événementielle",
    },
    content: [
      "Le retard dans les sessions plénières est souvent le cauchemar des comités d'organisation. Une clé USB non reconnue, une vidéo intégrée qui refuse de se lire ou une mauvaise version de diaporama peuvent décaler tout un programme de plusieurs heures.",
      "C'est ici qu'intervient la régie scientifique BAFIK. Dès la veille du congrès, notre salle des conférenciers (Speaker Ready Room) accueille les orateurs, vérifie les formats (vidéos codecs, polices, ratios 16:9) et pousse automatiquement les fichiers vers les ordinateurs de régie en salle.",
      "Grâce à des commutateurs de secours instantanés et un chronométrage visible pour les présidents de séance, le congrès se déroule avec la précision d'une émission de télévision professionnelle.",
    ],
  },
  {
    slug: "valorisation-post-congres-multiplier-impact-scientifique",
    title: "La valorisation post-congrès : multiplier par dix la portée de vos sessions",
    excerpt:
      "Pourquoi limiter les fruits de vos symposiums aux seuls jours de l'événement ? Découvrez comment capitaliser sur vos contenus tout au long de l'année.",
    category: "strategy",
    categoryLabel: "Stratégie & Impact",
    date: "12 Mars 2026",
    readTime: 7,
    cover:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Direction BAFIK",
      role: "Stratégie Éditoriale",
    },
    content: [
      "Chaque congrès rassemble les plus éminents spécialistes d'une discipline et génère des heures de discussions scientifiques d'une valeur inestimable. Malheureusement, faute de dispositif adapté, cette matière s'évanouit bien trop souvent dès les lampions éteints.",
      "Avec la méthodologie du 'Congrès Augmenté', BAFIK transforme ces enregistrements bruts en une médiathèque vivante : fiches synthétiques, capsules d'interviews, podcasts audio pour les médecins en déplacement et modules certifiants.",
      "Pour les sponsors et laboratoires partenaires, c'est également l'opportunité d'une visibilité prolongée et éthique, articulée autour de la formation continue des professionnels de santé.",
    ],
  },
];
