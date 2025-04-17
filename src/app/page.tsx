"use client";

import {download} from "@/lib/downloadProduction";
import React from "react";
import {Button} from "@/components/ui/button";
import { useProduction } from '@/hooks/useProduction';
import { Script } from '@/components/Script';
import { CharactersTable } from '@/components/CharactersTable';
import { ProductionForm } from '@/components/ProductionForm';
import { Documentation } from "@/components/Documentation";
import {MainNav} from "@/components/MainNav";

export default function Home() {
    const {
        production,
        setProduction,
        productionTitle,
        scriptText,
        handleTitleChange,
        handleScriptChange,
    } = useProduction();

    return (
        <main>
            <MainNav/>
            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">onCue Converter</h1>
                </header>
                <div className="space-y-8">
                    <section className="rounded-lg shadow pl-4 pr-4">
                        <CharactersTable 
                            production={production} 
                            setProduction={setProduction} 
                        />
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <section className="rounded-lg shadow p-4">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-lg font-semibold">Enter Script</h2>
                                <Documentation />
                            </div>
                            <ProductionForm
                                productionTitle={productionTitle}
                                scriptText={scriptText}
                                onTitleChange={e => handleTitleChange(e.target.value)}
                                onScriptChange={e => handleScriptChange(e.target.value)}
                            />
                        </section>
                        
                        <section className="rounded-lg shadow p-4">
                            <Script production={production} />
                        </section>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={() => download(production)}
                            disabled={!productionTitle.trim() || production.characters.length < 2 || !scriptText.trim()}
                            className="px-4 py-2"
                        >
                            Download .cuepkg
                        </Button>

                    </div>
                </div>
            </div>
        </main>
    );
}