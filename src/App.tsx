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
      <Reviews appId="0625b084-2415-430b-827d-3a5ddd6e5cab" />
      <Contact />
    </div>
  );
}
