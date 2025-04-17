import {Production} from "@/lib/models";

function print(production: Production) {
    console.log("------------------")
    console.log(production.title);
    for (const act of production.acts) {
        console.log(`Act ${act.number}`);
        for (const scene of act.scenes) {
            console.log(`Scene ${scene.number}`);
            for (const line of scene.lines) {
                console.log(`${line.character.name}: ${line.content}`);
            }
        }
    }
}