export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/homePage.png"
        alt="background"
        className="absolute top-0 left-0 w-full h-full  "
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full ">
        <h1 className="text-[#000080] bg-[#9CF2F9] text-6xl font-bold mb-4 ">
          WELCOME TO
        </h1>
        <h1 className="text-[#000080] bg-[#9CF2F9] text-7xl font-bold mb-4">
          SPEALISH
        </h1>
        <h1 className="text-blue-400 bg-[#9CF2F9] text-3xl font-bold mb-6">
          Learn English with us!
        </h1>
        <PrimaryButton text="START" />
      </div>
    </div>
  );
}
