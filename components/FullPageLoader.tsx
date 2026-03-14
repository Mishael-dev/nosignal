import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface FullPageLoaderProps {
  visible: boolean;
  onComplete?: () => void;
}

const FullPageLoader = ({ visible, onComplete }: FullPageLoaderProps) => {
  const [phase, setPhase] = useState<"loading" | "done" | "exit">("loading");

  useEffect(() => {
    if (!visible) {
      setPhase("loading");
      return;
    }

    setPhase("loading");
    const t1 = setTimeout(() => setPhase("done"), 1800);
    const t2 = setTimeout(() => {
      setPhase("exit");
      onComplete?.();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visible, onComplete]);

  if (!visible && phase === "exit") return null;
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      {/* Animated spinner / checkmark */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        {phase === "loading" && (
          <>
            {/* Spinning border */}
            <div className="absolute inset-0 animate-spin border-2 border-border border-t-foreground" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              NS
            </span>
          </>
        )}

        {phase === "done" && (
          <div className="flex h-20 w-20 items-center justify-center bg-foreground text-primary-foreground animate-in zoom-in-50 duration-300">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Text */}
      <p className="mt-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        {phase === "loading" ? "Confirming delivery…" : "Delivery confirmed!"}
      </p>
    </div>
  );
};

export default FullPageLoader;
