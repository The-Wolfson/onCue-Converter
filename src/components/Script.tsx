import {Act, Line, Production, Scene} from "@/lib/models";
import React from "react";

export function Script({production}: { production: Production }) {
    return (
        <div title={"script"}>
            <h2>{production.title}</h2>
            {production.acts.map((act: Act) => (
                <div key={"act" + act.number}>
                    <h3>Act {act.number}</h3>
                    {act.scenes.map((scene: Scene) => (
                        <div key={"scene" + scene.number}>
                            <h4>Scene {scene.number}</h4>
                            {scene.lines.map((line: Line) => (
                                <p key={act.number + "-" + scene.number + "-" + line.sequence}
                                >{line.sequence + "| " + line.character.name + ": " + line.content}</p>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}