import { CirclesWithBar } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="fixed top-0 w-full h-full flex justify-center items-center bg-black/45">
      <CirclesWithBar color="white" barColor="red" />
    </div>
  );
}
