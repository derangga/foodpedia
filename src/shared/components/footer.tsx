import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-screen bg-orange-400 flex flex-col justify-center px-8 py-4 gap-12">
      <div className="grow flex flex-row gap-12 font-poppins text-white">
        <div className="flex flex-col">
          <div className="font-semibold text-lg">Contact</div>
          <Link href={"mailto:aldebaransdev@gmail.com"}>Email</Link>
        </div>
        <div className="flex flex-col ">
          <div className="font-semibold text-lg">Source</div>
          <Link href={"https://github.com/derangga/foodpedia"}>Github</Link>
        </div>
      </div>
      <div className="text-white font-poppins font-semibold">
        Copyright © {year} Aldebarandev
      </div>
    </footer>
  );
};
