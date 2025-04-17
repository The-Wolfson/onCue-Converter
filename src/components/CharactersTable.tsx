import {Character, Gender, Production} from "@/lib/models";
import React, {useState} from "react";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export function CharactersTable({production, setProduction}: {
    production: Production;
    setProduction: React.Dispatch<React.SetStateAction<Production>>
}) {
    const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
    const [editName, setEditName] = useState("");
    const [editGender, setEditGender] = useState<Gender>(Gender.Unspecified);

    const handleEditStart = (character: Character) => {
        setEditingCharacter(character);
        setEditName(character.name);
        setEditGender(character.gender);
    };

    const handleEditSave = () => {
        if (!editingCharacter) return;

        setProduction((prev: Production) => {
            const updated = new Production(prev.title);
            updated.characters = prev.characters.map(char =>
                char === editingCharacter
                    ? new Character(editName, editGender)
                    : char
            );
            updated.acts = [...prev.acts];
            return updated;
        });

        setEditingCharacter(null);
    };

    const handleEditCancel = () => {
        setEditingCharacter(null);
    };

    const handleRemoveCharacter = (characterToRemove: Character) => {
        setProduction((prev: Production) => {
            const updated = new Production(prev.title);
            updated.characters = prev.characters.filter(char => char !== characterToRemove);
            return updated;
        });
    };

    return (
        <Table title={"characters"} className="mb-4 mt-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {production.characters.map((character: Character) => {
                    if (character.name === "StageNote") return null;

                    if (editingCharacter === character) {
                        return (
                            <TableRow key={character.name}>
                                <TableCell>
                                    <Input
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        placeholder="Character Name"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={editGender.toString()}
                                        onValueChange={(value) => setEditGender(Number(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a gender"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                <SelectItem value={Gender.Unspecified.toString()}>Unspecified</SelectItem>
                                                <SelectItem value={Gender.Male.toString()}>Male</SelectItem>
                                                <SelectItem value={Gender.Female.toString()}>Female</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right grid grid-cols-2 gap-4">
                                    <Button
                                        variant="secondary"
                                        onClick={handleEditCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleEditSave}
                                        disabled={!editName.trim()}
                                    >
                                        Save
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    }

                    return (
                        <TableRow key={character.name}>
                            <TableCell>{character.name}</TableCell>
                            <TableCell>{Gender[character.gender]}</TableCell>
                            <TableCell className="text-right grid grid-cols-2 gap-4">
                                <Button
                                    variant="secondary"
                                    onClick={() => handleEditStart(character)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleRemoveCharacter(character)}
                                >
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter>
                <AddCharacterRow production={production} setProduction={setProduction}/>
            </TableFooter>
        </Table>
    );
}

function AddCharacterRow({production, setProduction}: {
    production: Production;
    setProduction: React.Dispatch<React.SetStateAction<Production>>
}) {
    const [characterName, setCharacterName] = useState("");
    const [characterGender, setCharacterGender] = useState(Gender.Unspecified);

    const isNameValid = () => {
        return (
            characterName.trim() !== "" &&
            !production.characters.some(
                (char: Character) => char.name.toLowerCase() === characterName.trim().toLowerCase()
            )
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const character = new Character(characterName, characterGender);
        setProduction((prev: Production) => {
            const updated = new Production(prev.title);
            updated.characters = [...prev.characters, character];
            updated.acts = [...prev.acts];
            return updated;
        });
        setCharacterName("");
        setCharacterGender(Gender.Unspecified);
    };
    return (
        <TableRow>
            <TableCell>
                <Input
                    name="characterName"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder="Character Name"
                />
            </TableCell>
            <TableCell>
                <Select name="characterGender" value={characterGender.toString()}
                        onValueChange={(value) => setCharacterGender(Number(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a gender"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value={Gender.Unspecified.toString()}>Unspecified</SelectItem>
                            <SelectItem value={Gender.Male.toString()}>Male</SelectItem>
                            <SelectItem value={Gender.Female.toString()}>Female</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell className="text-right">
                <form onSubmit={handleSubmit}>
                    <Button type="submit" disabled={!isNameValid()}>
                        Add Character
                    </Button>
                </form>
            </TableCell>
        </TableRow>
    );
}