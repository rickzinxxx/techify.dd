import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ArrowLeft, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Zap,
  Filter
} from 'lucide-react';
import { Project } from '../types';
import { PROJECTS, PORTFOLIO_CATEGORIES } from '../data';

interface PortfolioSectionProps {
  onBackToHome: () => void;
  onLaunchDemo?: (projectId: string) => void;
}

export default function PortfolioSection({ onBackToHome, onLaunchDemo }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filtered lists
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory = 
        selectedCategory === 'Todos' || 
        proj.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesSearch = 
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#030303] bg-nebula pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Header Title Block */}
        <div className="text-center relative">
          <h1 className="font-display text-4xl font-black tracking-tighter text-white sm:text-6xl uppercase leading-none">
            PORTFÓLIO DE <br />
            <span className="text-brand-lime text-glow-green inline-block italic transform skew-x-[-3deg] mt-2">
              SITES
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-neutral-400">
            Explore nossa galeria de projetos desenvolvidos com excelência, performance e design de alto impacto.
          </p>

          {/* Sair Go Back Button matching screenshots */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 px-6 py-2.5 text-xs font-bold text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>SAIR</span>
            </button>
          </div>
        </div>

        {/* Search controls and Category tags panel */}
        <div className="mt-16 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-900 pb-6">
            
            {/* Search Input Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar projetos ou stacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 transition-all focus:border-brand-accent focus:bg-neutral-900 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
              <Filter className="h-4 w-4 text-brand-lime" />
              <span>FILTRAR POR PROPOSTA</span>
            </div>
          </div>

          {/* Category Tags scroll menu */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-4">
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-black tracking-wide transition-all duration-350 cursor-pointer border whitespace-nowrap ${
                    isActive
                      ? 'bg-brand-lime border-brand-lime text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                      : 'bg-neutral-900/30 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid display list of Projects */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-16 rounded-2xl border border-neutral-900 bg-neutral-950/20 py-20 text-center"
            >
              <p className="text-sm text-neutral-500">Nenhum projeto encontrado com estes critérios de busca.</p>
              <button
                onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
                className="mt-4 text-xs font-bold text-brand-lime hover:underline"
              >
                Limpar todos os filtros
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((proj) => (
                <motion.div
                  layout
                  key={proj.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-[#070707] transition-all duration-300 hover:border-neutral-700 hover:shadow-[0_8px_30px_rgba(57,255,20,0.05)]"
                >
                  {/* Card Header Media Cover */}
                  <div className="relative h-48 w-full overflow-hidden border-b border-neutral-900">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Upper Category Ribbon Badge */}
                    <span className="absolute left-4 top-4 rounded-md bg-neutral-950/90 border border-neutral-800 px-3 py-1 text-[10px] uppercase font-black tracking-wider text-brand-accent text-glow-green">
                      {proj.category}
                    </span>

                    {/* Quick redirection visual */}
                    <div className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center rounded-lg bg-black/95 border border-neutral-800 text-neutral-400 group-hover:text-brand-accent transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Card Content Brief Description */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-2xl font-black text-white group-hover:text-brand-lime transition-colors">
                        {proj.title}
                      </h3>
                      <Globe className="h-4.5 w-4.5 text-neutral-500" />
                    </div>

                    <p className="text-xs leading-relaxed text-neutral-400 line-clamp-3 mb-6">
                      {proj.description}
                    </p>

                    {/* Tags Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.tags.map(tag => (
                        <span key={tag} className="bg-neutral-900/60 border border-neutral-800/80 rounded px-2 py-0.5 text-[9px] font-mono text-neutral-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Access Site Project Button */}
                    <button
                      onClick={() => {
                        if ((proj.id === 'asme' || proj.id === 'yuffie') && onLaunchDemo) {
                          onLaunchDemo(proj.id);
                        } else {
                          setSelectedProject(proj);
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-lime hover:bg-brand-accent text-black font-extrabold text-xs py-3 transition-all duration-300 shadow-[0_2px_15px_rgba(163,230,53,0.15)] group-hover:shadow-[0_2px_20px_rgba(163,230,53,0.3)] cursor-pointer"
                    >
                      <Globe className="h-4 w-4" />
                      <span>{(proj.id === 'asme' || proj.id === 'yuffie') ? 'ABRIR DEMO LIVE ⚡' : 'ACESSAR SITE DO PROJETO'}</span>
                    </button>
                  </div>

                  {/* Card Footer Certified Tags */}
                  <div className="bg-neutral-950/80 px-6 py-4 border-t border-neutral-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                      <span className="text-[9px] font-black tracking-wider text-neutral-500 uppercase">
                        TECHIFY CERTIFIED PROJECT
                      </span>
                    </div>

                    {/* Small seals columns */}
                    <div className="flex gap-1">
                      <div className="h-6 w-6 rounded-full border border-neutral-800 bg-[#0c0c0c] flex items-center justify-center text-brand-lime" title="Performance 100/100">
                        <Zap className="h-3 w-3" />
                      </div>
                      <div className="h-6 w-6 rounded-full border border-neutral-800 bg-[#0c0c0c] flex items-center justify-center text-brand-cyan" title="Clean Code Core">
                        <Cpu className="h-3 w-3" />
                      </div>
                      <div className="h-6 w-6 rounded-full border border-neutral-800 bg-[#0c0c0c] flex items-center justify-center text-violet-400" title="Scale Secured Modules">
                        <Layers className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Project view Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl block-glow-green"
            >
              {/* Cover */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-xl border border-neutral-800">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 rounded-full bg-black/80 border border-neutral-800 p-2 text-white hover:bg-neutral-950"
                >
                  X
                </button>
              </div>

              {/* Body */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded bg-brand-accent/15 px-2 py-0.5 text-[9px] font-bold text-brand-accent border border-brand-accent/20 uppercase tracking-widest">{selectedProject.category}</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Código Certificado</span>
                </div>

                <h3 className="font-display text-3xl font-black text-white">{selectedProject.title}</h3>
                <p className="mt-4 text-sm text-neutral-300 leading-relaxed">{selectedProject.description}</p>

                <div className="mt-6 border-t border-neutral-900 pt-4">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Estruturas Tecnológicas Certificadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="rounded-lg bg-neutral-900 border border-neutral-800/80 px-3 py-1 text-xs text-neutral-300 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 rounded-xl border border-neutral-800 bg-transparent py-3 text-xs font-bold text-neutral-400 hover:text-white transition-colors"
                  >
                    Fechar Detalhes
                  </button>
                  {((selectedProject.id === 'asme' || selectedProject.id === 'yuffie') && onLaunchDemo) ? (
                    <button
                      onClick={() => {
                        const targetId = selectedProject.id;
                        setSelectedProject(null);
                        onLaunchDemo(targetId);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-lime hover:bg-brand-accent text-black font-extrabold text-xs py-3 transition-colors shadow-lg cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>ABRIR DEMO LIVE ⚡</span>
                    </button>
                  ) : (
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-lime hover:bg-brand-accent text-black font-extrabold text-xs py-3 transition-colors shadow-lg"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>VER SITE AO VIVO</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
