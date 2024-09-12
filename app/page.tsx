import Image from 'next/image';
import titleImg from '../public/CircuitSimulatorTitle.png';

export default function Home() {
  return <Image src={titleImg} alt="test" />;
}
