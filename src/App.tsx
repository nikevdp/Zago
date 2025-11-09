import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import Reviews from "./components/Reviews";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Products />
      <Reviews appId="1b2d5d60-8d0b-4ebd-945f-c1ebf064669a" />
      <Contact />
    </div>
  );
}
