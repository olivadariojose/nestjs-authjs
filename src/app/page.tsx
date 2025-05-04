import styles from "./page.module.css";
import Navbar from "@/compnents-general/Home/Navbar/Navbar";

export default async function Home() {



  return (
    <div className={styles.page}>
        <Navbar/>
      <main className={styles.main}>

      </main>


    </div>
  );
}
