import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import TopNavbar from "@/components/Navbars/TopNavbar";
import About from "@/components/About";


export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <TopNavbar/>
      <Hero/>
      <About/>
      <Story/>
      <Footer/>
      
    </div>
  );
}
