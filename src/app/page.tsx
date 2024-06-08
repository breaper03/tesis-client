import { AssistanceCheck } from './components/assistance-check';

export default function Home() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-screen bg-background">
      <span className="text-2xl text-foreground">Hello Tesis!!</span>
      <AssistanceCheck />
    </div>
  );
}
