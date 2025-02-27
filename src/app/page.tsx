import ContentGrid from '@/components/homepage/ContentGrid';

export default function Home() {
  return (
    <main>
      <div>
      <div className="min-w-screen flex flex-col justify-center items-center pt-6 pb-12 px-6">
        <h1 className="font-quintessential text-center p-6 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-fuchsia-200">
          D&D App
        </h1>
        <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-fuchsia-200 shadow-lg shadow-fuchsia-400/50 p-1">
          A place for many d&d needs - a personal project by Amanda.
        </p>
      </div>
      <div className="pb-40">
        <ContentGrid />
      </div>
      </div>
    </main>
  );
}
