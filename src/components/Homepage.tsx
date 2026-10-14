import { Link } from "react-router";

const steps = [
  ["01", "Catat lamaran"],
  ["02", "Perbarui status"],
  ["03", "Lihat progres"],
];

export default function Homepage() {
  return (
    <div className="flex min-h-[calc(100svh-2rem)] w-full max-w-6xl flex-col py-3">
      <header className="flex items-center justify-between border-b border-gray-700/70 pb-4">
        <Link to="/" className="flex items-center gap-3 text-white">
          <span className="bg-gradient flex h-9 w-9 items-center justify-center rounded-lg">
            <i className="fas fa-briefcase text-sm"></i>
          </span>
          <span className="font-semibold">
            LamaranKerja<span className="text-blue-400">Log</span>
          </span>
        </Link>
        <Link
          to="/login"
          className="text-sm text-gray-300 transition-colors hover:text-white"
        >
          Masuk <i className="fas fa-arrow-right ml-1 text-xs"></i>
        </Link>
      </header>

      <main className="grid flex-1 items-center gap-12 py-12 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
        <section className="animate-fade-in">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
            Job application tracker
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Semua lamaran kerja,{" "}
            <span className="text-blue-400">tercatat rapi.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-gray-300">
            Simpan detail lowongan, pantau status, dan tahu langkah berikutnya
            tanpa harus mencari-cari lagi.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="bg-gradient inline-flex items-center rounded-lg px-5 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              Buat akun
              <i className="fas fa-arrow-right ml-3 text-sm"></i>
            </Link>
          </div>
        </section>

        <section
          aria-label="Cara kerja LamaranKerjaLog"
          className="animate-fade-in border-l border-gray-700 pl-6 sm:pl-8"
        >
          <h2 className="mb-6 text-sm font-medium text-gray-400">
            Cara kerjanya
          </h2>
          <ol className="space-y-6">
            {steps.map(([number, label]) => (
              <li key={number} className="flex items-baseline gap-5">
                <span className="font-mono text-sm text-blue-400">{number}</span>
                <span className="text-lg text-white sm:text-xl">{label}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="flex items-center justify-between border-t border-gray-700/70 pt-4 text-xs text-gray-500 sm:text-sm">
        <span>© 2026 LamaranKerjaLog</span>
      </footer>
    </div>
  );
}
