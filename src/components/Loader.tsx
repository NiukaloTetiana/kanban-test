import { TailSpin } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#0b0b0b99] backdrop-blur-sm">
      <TailSpin
        visible={true}
        height="120"
        width="120"
        color="#f9f9f9"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
