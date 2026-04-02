import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const user = {name:"Teddy"}
  return (
    <>
      <div className="h-screen">
        <Header />
        <div className="mt-5 place-items-center justify-center flex md:flex-row gap-4 ">
          <div className="grid md:grid-cols-2 grid-cols-1 grow bg-lime-200/60 px-3 md:w-2/5 md:px-20 rounded-2xl container">
            <div className="p-6 flex items-center justify-center">
              <Image className="rounded-2xl md:w-auto backdrop-blur-3xl hover:scale-103 object-cover" src={"/connector.png"} width={500} height={500} alt="Database connector illustration picture"/>
            </div>
            <div className="px-10 flex justify-center flex-col">
              <p className="lg:text-2xl md:text-4xl text-2xl">
                <strong>Welcome Back {user.name}</strong> to the hub where data flows freely!
              </p>
              <p className="text-xl lg:text-xl md:text-3xl">Your connections simplified, Your insights amplified</p>
              <p className="font-light lg:text-lg md:text-4xl">Plug in, power up and let your database talk seamlessly</p>
              <Link className="my-10 mx-4 justify-center flex" href={"/signin"}><Button className="w-100 hover:bg-lime-400">Sign In</Button> </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
