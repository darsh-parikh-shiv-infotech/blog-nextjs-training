import { Loader2 } from "lucide-react";

interface LoaderProp {
  message?: string;
}
const Loader = ({ message }: LoaderProp) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      {message && (
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      )}
    </div>
  );
};

export default Loader;
