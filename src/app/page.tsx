export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to Babylon.js vs Three.js preview
      </h1>
      <p className="text-xl">
        Three.js preview: <a href="/three">~/three-js</a>
      </p>
      <p className="text-xl">
        Babylon.js preview: <a href="/babylon">~/babylon</a>
      </p>
    </main>
  );
}
