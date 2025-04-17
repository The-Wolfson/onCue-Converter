import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import { Info } from "lucide-react";

export function Documentation() {
    const docs = [
        {
            heading: "Act and Scene Headers",
            format: [
                "\"Act X\" or \"Scene Y\" (case-insensitive)"
            ],
            examples: [
                "Act 2",
                "ACT II",
                "",
                "Scene 4",
                "SCENE iv"
            ],
        },
        {
            heading: "Dialogue",
            format: [
                "\"CHARACTER: Dialogue text\"",
                "\"Character Name\" on its own line, followed by their dialogue.",
                "Character matching is case-insensitive."
            ],
            examples: [
                "JANE: Hello, John.",
                "JOHN: Hi, Jane.",
                "",
                "Jane",
                "Hello, John.",
                "John",
                "Hi, Jane.",
                "",
                "JANE",
                "I have a bad feeling about this.",
                "JOHN: We should leave.",
                "",
                "JANE: I don’t know what’s going on.",
                "Maybe we should turn back.",
                "JOHN",
                "Agreed."
            ]
        },
        {
            heading: "Stage Notes/Directions",
            format: [
                "Enclosed in parentheses: \"(some action)\"",
                "Enclosed in square brackets: \"[some action]\"",
                "Supports multiline notes"
            ],
            examples: [
                "(John enters the room)",
                "[Jane looks surprised.]",
                "",
                "(The lights dim as",
                "the music fades.)",
                "",
                "JOHN: I can't. (shaking head) This is unbelievable.",
                "JANE: Wait... [pauses] Are you serious?"
            ]
        }
    ]
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}> <Info/>Info</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Docs</DialogTitle>
                </DialogHeader>
                <Accordion type="single" collapsible>
                    {docs.map((doc) => (
                        <AccordionItem key={doc.heading} value={doc.heading}>
                            <AccordionTrigger>{doc.heading}</AccordionTrigger>
                            <AccordionContent>
                                <Accordion type="multiple">
                                    <AccordionItem value={"Format"}>
                                        <AccordionTrigger>Format</AccordionTrigger>
                                        <AccordionContent>
                        <pre>
                        {doc.format.map((format) => (
                            format + "\n"
                        ))}
                        </pre>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value={"Examples"}>
                                        <AccordionTrigger>Examples</AccordionTrigger>
                                        <AccordionContent>
                        <pre><code >
                        {doc.examples.map((example) => (
                            example + "\n"
                        ))}
                        </code></pre>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </DialogContent>
        </Dialog>
    );
}