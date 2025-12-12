import ButtonComponent from "@components/button";
import IconComponent from "../components/Icons";



export default function Home() {

  return(
    <div>
      <h1 className="text-white text-8xl w-45">L'actualité scientifique Africaine, décryptée</h1>
      <div className="flex flex-col lg:flex-row">
        <ButtonComponent textButton="S'abonner"   />
        <button>
            <IconComponent  name="ShoppingCartIcon" className={`text-white w-6 h-6 flex-shrink-0`} />
        </button>
      </div>

      <div className="bg-white w-400 h-300">
        <h1 className="text-black">À la une</h1>
      </div>
    </div>
  );
}
