import { NamingRule } from "@/types/drive";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, XCircle } from "lucide-react";

interface NamingRulesManagerProps {
  rules: NamingRule[];
  onValidate?: (name: string) => { valid: boolean; errors: string[] };
}

export const NamingRulesManager = ({ rules, onValidate }: NamingRulesManagerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Normas de Nombrado
        </CardTitle>
        <CardDescription>
          Reglas para mantener una estructura consistente en nombres de archivos y carpetas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{rule.name}</h4>
                    {rule.required && (
                      <Badge variant="destructive" className="text-xs">
                        Requerido
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                  <div className="mt-2">
                    <p className="text-xs font-mono bg-muted p-2 rounded">
                      Patrón: {rule.pattern}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ejemplo: <span className="font-mono">{rule.example}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

