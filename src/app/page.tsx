import { Suspense } from "react";
import { DragNDrop, DragNDropSkeleton } from "./_components/darg-n-drop";

const Home = () => {
  return (
    <Suspense fallback={<DragNDropSkeleton />}>
      <DragNDrop />
    </Suspense>
  );
};

export default Home;
