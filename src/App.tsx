import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Products />
      <Reviews />
      <Contact />
    </div>
  );
}
