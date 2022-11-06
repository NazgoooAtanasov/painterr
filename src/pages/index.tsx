import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";

const Home: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <header className="p-4">
        <Link href="/draw" className="mr-2">
          Just draw
        </Link>
        <Link href="/auth">Get signed</Link>
      </header>
      <main className="m-auto flex-grow">
        <Image src={logo} alt="logo" height={60} width={500} />
      </main>
    </div>
  );
};

export default Home;
