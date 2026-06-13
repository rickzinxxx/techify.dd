import { Project, Service, Course, Job } from './types';

export const SERVICES: Service[] = [
  {
    id: 'sites',
    title: 'CRIAÇÃO DE SITES',
    iconName: 'Globe',
    description: 'Websites modernos, responsivos e otizados para conversão que geram resultados reais.',
    color: '#06b6d4' // blue/cyan info
  },
  {
    id: 'design',
    title: 'DESIGN GRÁFICO',
    iconName: 'Palette',
    description: 'Identidade visual única, logos, banners e materiais gráficos que representam sua marca.',
    color: '#f97316' // orange
  },
  {
    id: 'dev',
    title: 'DESENVOLVIMENTO',
    iconName: 'Monitor',
    description: 'Código limpo, performático e escalável para qualquer tipo de projeto digital.',
    color: '#94a3b8' // white/silver
  },
  {
    id: 'seo',
    title: 'OTIMIZAÇÃO & SEO',
    iconName: 'Zap',
    description: 'Performance máxima e visibilidade no Google para seu site aparecer na frente.',
    color: '#22c55e' // green
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'yuffie',
    title: 'Yuffie Kinetic Interface',
    category: 'Portfólio',
    description: 'Uma belíssima interface cinética interativa japonesa de alta fidelidade visual (v4). Possui fluxo contínuo de pétalas fluidas orientais reagindo ao mouse, reprodutor premium de áudio integrado com barra de progresso, e efeito parallax responsivo de movimentação gradual de multicamadas.',
    imageUrl: 'https://u.cubeupload.com/zmonochrome/tumblr8b1866a9355004.jpg',
    tags: ['React', 'Interactive Particle Canvas', 'HTML5 Audio Engine', 'Smooth Parallax LERP'],
    certified: true
  },
  {
    id: 'mugsys-mugs',
    title: "Mugsy's Mugs",
    category: 'Landing Page',
    description: 'E-commerce premium e disruptivo projetado para coleções limitadas de canecas. Apresenta carrinho de compras interativo, transições de swipe contínuas, filtro de categoria dinâmico e modal de descrição de produtos de altíssima fidelidade estética.',
    imageUrl: 'https://i.postimg.cc/1zN0rTcN/img-1.jpg',
    tags: ['React', 'Interactive Cart Engine', 'Double Swipe Animations', 'Tailwind v4'],
    certified: true
  }
];

export const COURSES: Course[] = [
  {
    id: 'acad-techify',
    title: 'Academia Techify',
    category: 'Desenvolvimento',
    description: 'Cursos gratuitos de programação, design, idiomas, massagem e muito mais. IA gera aulas personalizadas pra você!',
    badge: { text: 'GRÁTIS', type: 'free' },
    duration: '40-120h',
    lessonsCount: 24
  },
  {
    id: 'idiomas',
    title: 'Aprenda Idiomas',
    category: 'Idiomas',
    description: 'Inglês americano, Português de Portugal, Espanhol, Japonês, Francês... com gírias e imersão cultural real!',
    badge: { text: 'MULTI-LÍNGUAS', type: 'languages' },
    duration: '60h por idioma',
    lessonsCount: 15
  },
  {
    id: 'ia-tutor',
    title: 'IA Tutora 24/7',
    category: 'Inteligência Artificial',
    description: 'Techify IA responde suas dúvidas, explica conceitos e te guia com voz, chat e trilhas personalizadas em tempo real.',
    badge: { text: 'IA', type: 'primary' },
    duration: 'Ilimitado',
    lessonsCount: 100
  }
];

export const JOBS: Job[] = []; // Zero positions based on "Nenhuma vaga aberta no momento"
export const MOCK_ROLES = ['Design', 'Desenvolvimento', 'Marketing', 'Vendas', 'Outro'];
export const PORTFOLIO_CATEGORIES = ['Todos', 'Landing Page', 'Corporativo', 'E-commerce', 'Blog', 'Portfólio', 'Plataforma', 'Outro'];
