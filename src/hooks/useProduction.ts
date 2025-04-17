// hooks/useProduction.ts
import { useState } from 'react';
import { Production, Character } from '@/lib/models';
import { linesFromText } from '@/lib/linesFromText';

export function useProduction() {
  const [productionTitle, setProductionTitle] = useState("");
  const [production, setProduction] = useState(new Production(""));
  const [scriptText, setScriptText] = useState("");

  const updateProduction = (title: string, characters: Character[], acts = production.acts) => {
    const updated = new Production(title);
    updated.characters = characters;
    updated.acts = acts;
    return updated;
  };

  const handleTitleChange = (newTitle: string) => {
    setProductionTitle(newTitle);
    setProduction(prev => updateProduction(newTitle, prev.characters));
  };

  const handleScriptChange = (text: string) => {
    setScriptText(text);
    linesFromText(production, text.split("\n"));
  };

  return {
    production,
    setProduction,
    productionTitle,
    scriptText,
    handleTitleChange,
    handleScriptChange,
  };
}