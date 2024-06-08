import { AssistanceCheck } from './components/assistance-check';
import { NavBar } from './components/nav-bar';

export default function Home() {
  return (
    <div className="flex flex-col gap-2 items-center justify-start w-full h-screen bg-background">
      <div className="flex w-full h-fit items-center">
        <NavBar />
      </div>
      <div className='flex items-center justify-center w-full h-full'>
        <AssistanceCheck />
      </div>
    </div>
  );
}
