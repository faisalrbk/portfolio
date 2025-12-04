import Hero from "./sections/Hero"
import Navbar from "./sections/Navbar"

export  default function App() {
  return (
    <div className="relative w-screen min-h-screen overflow-x-auto ">
      <Navbar />
      <Hero />
      <section id="home" className="min-h-screen"></section>
      <section id="services" className="min-h-screen bg-amber-200"></section>
    </div>
  )
}
