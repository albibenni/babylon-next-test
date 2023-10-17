export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Babylon vs Tree preview</h1>
      <p className="text-xl">
        Tree.js preview: <a href="/tree-js">~/tree-js</a>
      </p>
      <p className="text-xl">
        Babylon.js preview: <a href="/babylon">~/babylon</a>
      </p>
    </main>
  );
}
