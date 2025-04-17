// hooks/useCharacters.ts
import { useState } from 'react';
import { Character, Gender, Production } from '@/lib/models';

export function useCharacters(
  production: Production,
  setProduction: (value: React.SetStateAction<Production>) => void
) {
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [editName, setEditName] = useState("");
  const [editGender, setEditGender] = useState<Gender>(Gender.Unspecified);

  const updateCharacters = (updaterFn: (chars: Character[]) => Character[]) => {
    setProduction(prev => {
      const updated = new Production(prev.title);
      updated.characters = updaterFn(prev.characters);
      updated.acts = [...prev.acts];
      return updated;
    });
  };

  const handleEditStart = (character: Character) => {
    setEditingCharacter(character);
    setEditName(character.name);
    setEditGender(character.gender);
  };

  const handleEditSave = () => {
    if (!editingCharacter || !editName.trim()) return;

    updateCharacters(chars =>
      chars.map(char =>
        char === editingCharacter
          ? new Character(editName, editGender)
          : char
      )
    );
    setEditingCharacter(null);
  };

  const handleEditCancel = () => setEditingCharacter(null);

  const handleRemoveCharacter = (characterToRemove: Character) => {
    updateCharacters(chars => chars.filter(char => char !== characterToRemove));
  };

  const addCharacter = (name: string, gender: Gender) => {
    if (!name.trim()) return;
    
    const character = new Character(name, gender);
    updateCharacters(chars => [...chars, character]);
  };

  return {
    editingCharacter,
    editName,
    editGender,
    setEditName,
    setEditGender,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    handleRemoveCharacter,
    addCharacter,
  };
}