import {Character, Production, Line, Act, Scene} from "./models"

export function linesFromText(production: Production, texts: string[]) {
    production.acts = []
    production.acts.map(act => {act.scenes = []})
    const stageNoteCharacter: Character = production.characters.find(char => char.name === "StageNote") ?? (new Character("StageNote", 0));
if (production.characters.find(char => char.name == "StageNote") == undefined) {
    production.characters.push(stageNoteCharacter)
}
    let character: Character | null = null
    let isStageNote: boolean = false
    let stageNote: string = ""
    let phrase: string = ""
    let act: Act = new Act(1)
    let scene: Scene = new Scene(act.scenes.length + 1)

    function addLine(content: string, character: Character = stageNoteCharacter) {
        scene.lines.push(new Line(scene.lines.length + 1, content.trim(), character))
    }

    function inlineStageNote() {
        if (character == null || phrase == "") {
            return
        }

        const regex = /\(.*?\)|\[.*?]/; // non-greedy match for () or []
        const match = phrase.match(regex);

        if (match) {
            const fullMatch = match[0];
            const innerText = fullMatch.slice(1, -1);
            const startIndex = match.index!;
            const endIndex = startIndex + fullMatch.length;

            const before = phrase.slice(0, startIndex).trim();
            const after = phrase.slice(endIndex).trim();

            if (before) {
                addLine(before, character!)
            }

            addLine(innerText)

            if (after) {
                addLine(after, character!)
            }
        } else {
            addLine(phrase.trim(), character!)
        }
        phrase = ""
    }

    for (let text of texts) {
        text = text.trim();

        if (text === "") {
            continue
        }

        if (text.toUpperCase().startsWith("ACT")) {
            act = new Act(production.acts.length + 1)
            production.acts.push(act)
            character = null
            isStageNote = false
            stageNote = ""
            phrase = ""
            continue
        }
        if (text.toUpperCase().startsWith("SCENE")) {
            scene = new Scene(act.scenes.length + 1)
            act.scenes.push(scene)
            character = null
            isStageNote = false
            stageNote = ""
            phrase = ""
            continue
        }

        if (text.startsWith("(") || text.startsWith("[") || isStageNote) {
            if (text.startsWith("(") || text.startsWith("[")) {
                inlineStageNote()
            }
            stageNote += (" " + text)
            isStageNote = true

            if (text.endsWith(")") || text.endsWith("]")) {
                addLine(stageNote)
                isStageNote = false
                stageNote = ""
            }
            continue
        }
        const textCharacter = production.characters.find(char => {
            const charName = char.name.toLowerCase();
            const textLower = text.toLowerCase();
            const textPrefix = text.split(":", 2)[0].toLowerCase();

            return charName === textLower || charName === textPrefix;
        });

        if (textCharacter) {
inlineStageNote()
            if (text.split(":", 2).length > 1) {
                phrase = text.split(":", 2)[1] ?? ""
            }
            character = textCharacter
            continue
        }
        phrase += (" " + text)
    }
    inlineStageNote()
}