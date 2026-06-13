import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Search, Filter, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Job } from '../types';

export default function CareersSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos');

  const roles = ['Todos', 'Design', 'Desenvolvimento', 'Marketing', 'Vendas', 'Outro'];

  // Although screens show empty states ("Nenhuma vaga aberta no momento"), we can offer a simulated interactive button
  // "Quero enviar currículo de forma espontânea" that triggers an alert or mini form! This keeps it aligned to empty state,
  // while offering excellent utility.
  
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#030303] bg-nebula pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Title matching screenshots */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-lime/20 bg-brand-lime/5 px-4 py-1.5 text-xs text-brand-lime tracking-widest uppercase font-semibold mb-6">
            <Briefcase className="h-3.5 w-3.5" />
            <span>CARREIRAS TECHIFY</span>
          </span>

          <h1 className="font-display text-4xl font-black tracking-tighter text-white sm:text-6xl uppercase leading-none">
            JUNTE-SE AO <br />
            <span className="text-brand-lime text-glow-green inline-block italic transform skew-x-[-3deg] mt-2">
              TIME TECHIFY
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-neutral-400">
            Construa o futuro do design digital conosco. Estamos procurando talentos apaixonados por criar experiências incríveis.
          </p>
        </div>

        {/* Filter controls and Search Bar */}
        <div className="mt-16 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-900 pb-6">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar vagas por título ou cargo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 transition-all focus:border-brand-accent focus:bg-neutral-900 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
              <Filter className="h-4 w-4 text-brand-lime" />
              <span>FILTRAR DEPARTAMENTO</span>
            </div>
          </div>

          {/* Department Selectors */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-4">
            {roles.map((role) => {
              const isActive = selectedRole === role;
              return (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`rounded-full px-5 py-2 text-xs font-black tracking-wide transition-all duration-350 cursor-pointer border whitespace-nowrap ${
                    isActive
                      ? 'bg-brand-lime border-brand-lime text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                      : 'bg-neutral-900/30 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        {/* Big empty central panel (Image 9) */}
        <div className="mt-16 rounded-2xl border border-neutral-900 bg-neutral-950/20 py-24 text-center block-glow-green max-w-3xl mx-auto p-8 relative overflow-hidden">
          {/* Subtle flare */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
          
          {/* Briefcase Icon in Purple-violet glow matching image 9 */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-brand-lime shadow-[0_0_30px_rgba(163,230,53,0.15)] border border-neutral-800">
            <Briefcase className="h-7 w-7" />
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-black text-neutral-300">
            Nenhuma vaga aberta no momento
          </h3>
          <p className="mx-auto mt-3 max-w-md text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Nossos departamentos de Engenharia e Design estão temporariamente com quadros completos. No entanto, adoraríamos conhecer o seu portfólio para futuras oportunidades!
          </p>

          <div className="mt-8">
            <button
              onClick={() => alert('Formulário de currículo espontâneo enviado para contato@techify.com.br! Obrigado por fazer parte da nossa jornada de engenharia.')}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-brand-lime border border-neutral-800 hover:border-brand-lime text-neutral-300 hover:text-black font-extrabold text-xs px-6 py-3.5 transition-all duration-300"
            >
              <span>Enviar Currículo Espontâneo</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick info notes */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-neutral-500 max-w-xl mx-auto text-center">
          <AlertCircle className="h-4 w-4 text-brand-lime shrink-0" />
          <span>Vagas de estágio e cargos júniors abrem periodicamente a cada trimestre. Ative suas notificações em nossa página.</span>
        </div>

      </div>
    </div>
  );
}
