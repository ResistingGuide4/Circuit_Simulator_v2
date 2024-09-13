import Image from 'next/image';
import titleImg from '../public/CircuitSimulatorTitle.png';
import Link from 'next/link';
import style from './homepage.module.css'

export default function Home() {
  return (
      <>
        <Image src={titleImg} alt="test" className={style.titleImg} />
        <Link href="/sandbox" className={style.link}>Sandbox Mode</Link>
      </>
    );
}
