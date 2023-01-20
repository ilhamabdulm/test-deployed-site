export function LoginBanner() {
  return (
    <div className="bg-top relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-cover min-h-50-screen rounded-xl bg-[url('./assets/images/green-forest-min.jpg')]">
      <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-zinc-800 to-zinc-700 opacity-60"></span>
      <div className="container mx-auto z-10">
        <div className="flex flex-wrap justify-center -mx-3">
          <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
            <h1 className="mt-12 mb-2 text-white">Welcome!</h1>
            <p className="text-white">
              Lets travel towards Carbon Free Environment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
