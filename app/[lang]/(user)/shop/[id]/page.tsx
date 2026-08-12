/* eslint-disable @next/next/no-img-element */
"use client";

import { Product } from "@app/interfaces";
import { CreateOrder } from "@app/actions/Order";
import { FetchProductById } from "@app/actions/ProductsManager";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArticleDisplay } from "@/app/[lang]/components/viewElement";
import LoginRegisterComponent from "@app/components/login_register_Component";
import { useAuth } from "@/app/[lang]/context/authContext";
import { InputsProps } from "../../layout";

export default function DetailsProduct() {
  const params = useParams();
  const productId = params.id as string;
  const { isLoggedIn, loading: authLoading } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputs: InputsProps[] = [
    {
      typeInput: "email",
      placeholderInput: "Email",
      inputValue: email,
      setInputValue: setEmail,
    },
    {
      typeInput: "password",
      placeholderInput: "Mot de passe",
      inputValue: password,
      setInputValue: setPassword,
    },
  ];

  const inputsRegister: InputsProps[] = [
    {
      typeInput: "text",
      placeholderInput: "Nom",
      inputValue: firstName,
      setInputValue: setFirstName,
    },
    {
      typeInput: "text",
      placeholderInput: "Prenom",
      inputValue: lastName,
      setInputValue: setLastName,
    },
    {
      typeInput: "email",
      placeholderInput: "Email",
      inputValue: email,
      setInputValue: setEmail,
    },
    {
      typeInput: "password",
      placeholderInput: "Mot de passe",
      inputValue: password,
      setInputValue: setPassword,
    },
    {
      typeInput: "password",
      placeholderInput: "Confirmer le mot de passe",
      inputValue: confirmPassword,
      setInputValue: setConfirmPassword,
    },
  ];

  useEffect(() => {
    (async () => {
      const product = await FetchProductById(productId);
      if (product) {
        setProduct(product);
      }
    })();
  }, [productId]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoginOpen(false);
      setIsRegisterOpen(false);
    }
  }, [isLoggedIn]);

  const increaseQuantity = () => {
    if ((product?.stock as number) > quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleCreatedOrder = async () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    const order = await CreateOrder({
      productId: productId,
      quantity: quantity,
    });
    if (order) {
      console.log("Commande créée : ", order);
    }
  };

  const rawDescription = product?.description || "";
  const displayDescription =
    !isLoggedIn && rawDescription
      ? rawDescription.length > 150
        ? `${rawDescription.slice(0, 150)}...`
        : rawDescription
      : rawDescription;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-2xl border border-white/10">
          <img
            src={product?.preview_image}
            alt={product?.name}
            className="w-full h-72 sm:h-96 md:h-[420px] lg:h-[700px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div>
            <h2 className="text-5xl font-extrabold tracking-tight mb-4">
              {product?.name}
            </h2>
            <div className="h-1 w-20 bg-[#E85C41] mb-6"></div>
            <div className="text-white text-lg leading-relaxed max-w-xl">
              {ArticleDisplay({ htmlContent: displayDescription })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center bg-white/5 p-8 rounded-3xl border border-white/10 shadow-inner">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[#E85C41] uppercase tracking-widest text-sm font-bold">
                  Prix Unitaire
                </span>
                <p className="text-4xl font-bold">
                  {product?.price ? product.price.toLocaleString() : 0}{" "}
                  <span className="text-lg font-normal opacity-70">FCFA</span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#E85C41] uppercase tracking-widest text-sm font-bold">
                  Stock
                </span>
                <p className="text-4xl font-bold">
                  {product?.stock ? product.stock.toLocaleString() : 0}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[#E85C41] uppercase tracking-widest text-sm font-bold">
                Quantité
              </span>
              <div className="flex items-center justify-between bg-white rounded-2xl p-2 w-full max-w-40 shadow-lg">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#E85C41] hover:text-white text-gray-800 transition-all flex items-center justify-center text-2xl"
                >
                  −
                </button>
                <span className="text-xl font-black text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#E85C41] hover:text-white text-gray-800 transition-all flex items-center justify-center text-2xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {!isLoggedIn && (
            <div className="p-6 rounded-2xl bg-linear-to-t from-blue-900/40 to-transparent border border-blue-500/30 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Connectez-vous pour voir tous les détails
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Créez un compte ou connectez-vous pour effectuer vos commandes
                et accéder aux informations détaillées.
              </p>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-[#E85C41] hover:bg-[#cf4d35] text-white font-bold py-2.5 px-6 rounded-full transition-all transform hover:scale-105"
              >
                Se connecter
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              className="flex-1 bg-[#E85C41] hover:bg-[#cf4d35] text-white text-xl font-bold py-5 px-8 rounded-2xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-[#E85C41]/20"
              onClick={handleCreatedOrder}
            >
              Acheter maintenant
            </button>
            <button className="flex-1 border-2 border-[#E85C41] text-[#E85C41] hover:bg-[#E85C41]/10 text-xl font-bold py-5 px-8 rounded-2xl transition-all">
              Personnaliser
            </button>
          </div>
        </div>
      </div>

      {isLoginOpen && (
        <LoginRegisterComponent
          type="login"
          title="Connexion"
          inputs={inputs}
          onClose={() => setIsLoginOpen(false)}
          onSubmit={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
      )}

      {isRegisterOpen && (
        <LoginRegisterComponent
          type="register"
          title="Inscription"
          inputs={inputsRegister}
          onClose={() => setIsRegisterOpen(false)}
          onSubmit={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </div>
  );
}
