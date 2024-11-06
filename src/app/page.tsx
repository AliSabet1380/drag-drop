import { Suspense } from "react";
import { DragNDrop } from "./_components/darg-n-drop";

const Home = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <DragNDrop />
    </Suspense>
  );
};

export default Home;
