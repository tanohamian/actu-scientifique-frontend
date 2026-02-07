'use client'
import IconComponent from "@/app/components/Icons";
import SusbscriptionCard, { PlanProps } from "@/app/components/subscription";
import { useRouter } from "next/navigation";
import { ShoppingCart } from 'lucide-react'


export default function SusbscriptionPage() {
    const plans: PlanProps[] = [
        {
            title: "Abonnement trimestriel",
            price: "3000 FCFA",
            features: ["Accès 3 mois", "3 articles de différents genres par mois", "une newsletter"],
            buttonText: "S'abonner"
        },
        {
            title: "Abonnement Annuel",
            price: "9000 FCFA",
            features: ["Accès 1 an", "3 articles de différents genres par mois", "une newsletter trimestrielle"],
            isPopular: true,
            buttonText: "S'abonner maintenant"
        },
        {
            title: "Abonnement semestriel",
            price: "5000 FCFA",
            features: ["Accès 6 mois", "3 articles de différents genres par mois", "une newsletter trimestrielle"],
            buttonText: "S'abonner"
        }
    ];
    const router = useRouter()
    return (
        <div className="flex flex-col">
            <div className=" py-12 px-4 flex flex-col gap-8 md:gap-4 lg:gap-8">
                <h1 className="text-7xl font-bold w-25 text-white">S'abonner à l'actualité scientifique</h1>
                <p className="text-white text-3xl font-bold">Accès exclusive à l'actualité sur la science en Afrique</p>
                <button
                    className="bg-white/10 hover:bg-white/20 transition-all duration-200 rounded-lg p-4 flex items-center justify-center min-h-[120px] group w-[250px]"
                    onClick={() => router.push('/shop')}
                >
                    <div className="flex flex-col items-center justify-center gap-2">
                        <ShoppingCart className="text-white w-10 h-10 group-hover:scale-110 transition-transform" />
                        <span className="text-white text-base font-bold">Boutique</span>
                    </div>
                </button>
            </div>
            <div className="w-full  py-12 px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-8">
                {plans.map((plan, index) => (
                    <SusbscriptionCard key={index} {...plan} />
                ))}
            </div>
        </div>
    );
}
