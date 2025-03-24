export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-screen bottom-0 h-24 bg-orange-400 flex flex-col justify-center px-8 py-4">
      <section>
        <div className="text-white font-poppins font-semibold">
          Copyright © {year} Aldebarandev
        </div>
      </section>
    </footer>
  );
};
