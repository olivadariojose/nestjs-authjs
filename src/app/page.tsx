import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { auth } from "../../auth";

export default async function Home() {

  // const session = await auth()
  // console.log('La sesion en HOME: ', session)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Link href={'/signin'} >
        <button> Iniciar sesion </button>
        </Link>

      </main>

    </div>
  );
}
