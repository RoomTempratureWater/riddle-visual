import React from "react";
import { useState, useEffect, useRef, createContext, useMemo } from "react";
import Optimal from './Optimal.jsx';

export default function Simulator() {
    let [random, setrandom] = useState(false);
    let [room, setroom] = useState({});
    let [showsim, setsim] = useState(false);
    //let [deprender, setdep] = useState([0,<Optimal/>]);
    const [numRows, setNumRows] = useState(Object.keys(room).length);
    const resizableDivRef = useRef(null);
    //const newroom = useMemo(() => generateroom(), [random]);
    //const onClick = () => {setsim(true)}
    // Function to handle resizing
    const handleResize = () => {
      if (resizableDivRef.current) {
        const height = resizableDivRef.current.clientHeight;
        const calculatedNumRows = Math.floor(height / 60); // Adjust the height per row as needed
        setNumRows(calculatedNumRows);
      }
    };

    function randomclick(){
      setrandom(!random)
      if(showsim){setsim(false)}
    };
    
    
    //const zipy = (a, b) => a.map((k, i) => [k, b[i]]);
    useEffect(() =>{
      let res = generateroom();
      setroom(res)
    }, [random]);

    useEffect(()=>{
        console.log("usefrna")
        setrandom(!random)
        window.addEventListener('resize', handleResize);

        // Initial call to set the number of rows based on initial div size
        handleResize();

        // Cleanup the event listener when the component unmounts
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    return(
        <>
        <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div>
        <div class="md:container grid grid-cols-10 gap-4 h-[500px] overflow-y-auto bg-gray-200">
        {shuffleArray(Object.entries(room)).map(([rowKey, value]) => (
          <div key={`row-${rowKey}`} alignItems="center" marginBottom="10px">
            {
              <div class="w-32 h-24 bg-blue-500 text-white p-4 rounded-md shadow-md">
                <div class="text-lg font-bold">Box: {rowKey}</div>
                <div class="mt-2"> Slip: {value}</div>
              </div>
            }
          </div>
        ))}
        </div>
      </div>

      <button onClick={() => randomclick()}
      class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
        <span
                        class="relative text-base font-semibold text-primary dark:text-white"
                        >Randomize</span
                      >
      </button>
      <br></br>
      <button onClick={() => {setsim(true)}}
      class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
            <span
                        class="relative text-base font-semibold text-primary dark:text-white"
                        >Simulate!</span
                      >
      </button>
      <br></br>
      {showsim && <Optimal room={room}/>}
      </div>
    </>
    );
}

function generateroom(){
    let randarr1 = Array.from({length: 100}, (_, i) => i + 1)
    let randarr2 = Array.from({length: 100}, (_, i) => i + 1)
    shuffleArray(randarr1);
    shuffleArray(randarr2);
    const room = randarr1.reduce((acc, key, index) => {
        acc[key] = randarr2[index];
        return acc;
      }, {});
    return room
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}



