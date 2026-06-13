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
    id: 'asme',
    title: 'Asme',
    category: 'Landing Page',
    description: 'Built for the curious. Uma landing page cinematográfica de altíssimo nível, utilizando fundos em vídeo full-screen com fade dinâmico via JS, tipografia clássica Instrument Serif e componentes em Glass Liquid de alta fidelidade visual.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Instrument Serif', 'Liquid Glass', 'Custom Video Loop'],
    certified: true
  },
  {
    id: 'kaldi',
    title: 'KALDI',
    category: '3D Experience',
    description: 'Uma experiência imersiva em 3D desenvolvida para a KALDI. Design agressivo, performance fluida e animações de alto nível que prendem o usuário do início ao fim.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
    tags: ['Svelte', 'Three.js', 'Tailwind', 'GSAP'],
    certified: true
  },
  {
    id: 'epic-designer',
    title: 'EPIC DESIGNER',
    category: 'Landing Page',
    description: 'O EPIC DESIGNER é uma empresa especializada em design gráfico para o setor gastronômico, oferecendo serviços digitais, cardápios interativos e marcas inesquecíveis.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Framer Motion', 'Tailwind'],
    certified: true
  },
  {
    id: 'saude-connect',
    title: 'Saude Connect',
    category: 'Corporativo',
    description: 'O site Saude Connect é uma plataforma corporativa dedicada a otimizar o atendimento à saúde dos colaboradores, oferecendo telemedicina ágil e monitoramento de bem-estar.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
    certified: true
  },
  {
    id: 'senac-reciclagem',
    title: 'Senac Reciclagem',
    category: 'Corporativo',
    description: 'O site Senac Reciclagem é uma plataforma educacional dedicada à conscientização ambiental, oferecendo informações sobre técnicas corretas de descarte e reciclagem.',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Tailwind', 'Vite', 'Node.js'],
    certified: true
  },
  {
    id: 'vibe-sound',
    title: 'VibeMusic Shop',
    category: 'E-commerce',
    description: 'Plataforma completa de varejo musical com reprodutor de prévia em alta definição, fluxo de checkout integrado e gestão de produtos escalável.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    certified: true
  },
  {
    id: 'techify-academy',
    title: 'Techify Academy',
    category: 'Plataforma',
    description: 'Nosso próprio portal de ensino totalmente responsivo e customizado que conecta alunos a cursos de tecnologia gerados por inteligência artificial.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Express', 'D3.js'],
    certified: true
  },
  {
    id: 'crypto-dash',
    title: 'CryptoSphere',
    category: 'Outro',
    description: 'Uma dashboard web de análise criptoeconômica em tempo real, monitorando taxas de queima, liquidez, e sentimentos de redes sociais através de IA.',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Recharts', 'WebSockets'],
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
