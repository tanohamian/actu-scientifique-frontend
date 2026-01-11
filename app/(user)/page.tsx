import ButtonComponent from "@components/button";
import IconComponent from "../components/Icons";



export interface FirstInformations {
  media: string;
  title: string;
  description: string;
}

const dataFirstInformations: FirstInformations[] = [
  {
    media: "https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production+Library/27-09-2021_UNICEF-265891_Cote-Ivoire.jpg/image1440x560cropped.jpg",
    title: "",
    description: ""
  },
  {
    media: "https://tse2.mm.bing.net/th/id/OIP.ddDnqzkmqT9eY15AnFIKWQHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "",
    description: ""
  },
  {
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "",
    description: ""
  },
  {
    media: "https://www.cameroon-tribune.cm/articles/x7738_P_36_ph01_M_ningite.jpg",
    title: "",
    description: ""
  },
  {
    media: "https://www.bing.com/videos/riverview/relatedvideo?q=lutte+contre+la+meningite&&mid=A429B5459A0F07F9107FA429B5459A0F07F9107F&FORM=VRDGAR",
    title: "",
    description: ""
  },
  {
    media: "https://www.bing.com/videos/riverview/relatedvideo?q=lutte+contre+la+meningite&&mid=406D089AA26D8E43FBDC406D089AA26D8E43FBDC&FORM=VRDGAR",
    title: "",
    description: ""
  }

]
export default function Home() {
  return (
    <div className="px-4 py-8 md:px-8 md:py-12">
      <h1 className="text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl max-w-4xl leading-tight mb-8">
        L'actualité scientifique Africaine, décryptée
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <button className="bg-[#E65A46] text-white font-medium rounded-lg border-none transition-all duration-200 hover:bg-[#d14a36] whitespace-nowrap flex justify-center items-center font-sans px-6 py-3 text-base md:text-lg lg:text-xl w-full sm:w-auto">
          S'abonner
        </button>

        <button className="bg-white/10 rounded-lg p-3 w-full sm:w-auto sm:aspect-square hover:bg-white/20 transition-all flex items-center justify-center">
          <IconComponent
            name="ShoppingCartIcon"
            className="text-white w-6 h-6 flex-shrink-0"
          />
        </button>
      </div>

      <div className="bg-white w-full max-w-8xl rounded-lg p-6 md:p-8 lg:p-12 shadow-xl">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          À la une
        </h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-2/3 bg-blue-600 min-h-[400px] rounded-lg p-6 flex items-center justify-center">
            <p className="text-white text-xl">Article principal</p>
          </div>

          <div className="w-full lg:w-1/3 bg-red-600 min-h-[400px] rounded-lg p-6 flex items-center justify-center">
            <p className="text-white text-xl">Articles secondaires</p>
          </div>
        </div>
      </div>
    </div>
  );
}