import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductionFormProps {
  productionTitle: string;
  scriptText: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScriptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ProductionForm({
  productionTitle,
  scriptText,
  onTitleChange,
  onScriptChange,
}: ProductionFormProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input
        name="productionTitle"
        value={productionTitle}
        onChange={onTitleChange}
        placeholder="Production Title"
      />
      <Textarea
        name="scriptText"
        value={scriptText}
        onChange={onScriptChange}
        placeholder="Paste or Type your script here."
      />
    </div>
  );
}