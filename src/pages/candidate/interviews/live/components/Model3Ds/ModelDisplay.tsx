import { Environment } from "@react-three/drei";
import { lazy, Suspense, useMemo } from "react";

export default function ModelDisplay({
  model = "alice",
}: {
  model?: "peter" | "alice";
}) {
  const Model = useMemo(() => {
    switch (model) {
      case "peter":
        return lazy(() => import("./John/Model"));
      case "alice":
        return lazy(() => import("./Alice/Model"));
      default:
        return lazy(() => import("./Alice/Model"));
    }
  }, [model]);

  return (
    <>
      <Suspense fallback={null}>
        <Model position={[0, -4, 5]} scale={2.5} />
      </Suspense>

      <Environment preset="sunset" />
    </>
  );
}
