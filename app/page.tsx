import ThemeButton from "../components/ThemeButton";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center text-center p-24">
      <div className="font-bold text-4xl m-4">Hello world!</div>
      <ThemeButton/>
    </main>
  )
}