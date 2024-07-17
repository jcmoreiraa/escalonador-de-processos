import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen flex flex-col items-center mt-10 h-screen">
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-1.5">
          <input type="radio" id="fifo" name="process" />
          <label htmlFor="fifo" >FIFO</label>
        </div>
        <div className="flex flex-row gap-1.5">
          <input type="radio" id="sjf" name="process" />
          <label htmlFor="sjf" >Shortest Job First</label>
        </div>
        <div className="flex flex-row gap-1.5">
          <input type="radio" id="rr" name="process" />
          <label htmlFor="rr" >Rounded Robin</label>
        </div>
        <div className="flex flex-row gap-1.5">
          <input type="radio" id="edf" name="process" />
          <label htmlFor="edf" >EDF</label>
        </div>
      </div>
    </div>
  );
}
