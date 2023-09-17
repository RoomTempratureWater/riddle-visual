import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
//// { roomcontext } from "./Simulator";


export default function Optimal({room}){
    const [res, setres] = useState({});
    const [live, setlive] = useState(false);
    const [show, setshow] = useState(false)
    useEffect(() => {
            let newres = allprisoners(room)
            setres(newres);
            if(Object.keys(newres).length == 100){
                console.log("all survived!");
                //console.log(newres);
                setlive(true);
                
            }
            setshow(true);
    }, []);

    return(
        <>
        <div>
            {!live && <h1>THEY ALL DIED BECAUSE OF NUMBER {Object.keys(res).length}</h1>}
            {live && <h1>THEY ALL LIVE!</h1>}
            
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Prisoner
                </th>
                <th scope="col" class="px-6 py-3">
                    Survived?
                </th>
                <th scope="col" class="px-6 py-3">
                    Path
                </th>
            </tr>
        </thead>
        <tbody>
            
        


            {show && Object.entries(res)?.map(keyy => <Modaal keyl={[keyy, room]}></Modaal>)}
            </tbody>
    </table>
    </div>
        </div>
        </>
    );
}

function allprisoners(room){
    let data = {}
    for(var i=1; i<=100; i++){
        let res = perperson(i, room);
        if(res['pass'] == false){
            console.log("all dead becasue mf failed number: ", i);
            data[i] = res['some'];
            break;
        }
        // else{
        //     const leen = (res['some']).length;
        //     console.log(res['some'][leen-1]);
        //     res['some'].push( room[( res['some'][leen - 1] )] );
        //     console.log(res['some'], room[( res['some'][(leen - 1)] )]);
        // }
        data[i] = res['some'];
    }
    return data;
}


function perperson(id, room){
    var i = 1;
    var pass = false;
    let all_loops = [];
    let looplist = [];
    var prev = id;
    while(i<=50 && !pass ){
        //console.log("debug: ", i, prev, room[prev], id)
        if(room[prev] == id){
            pass = true;
        }
        looplist.push(prev);
        //console.log(visited)
        prev = room[prev];
        if(pass){
            break
        }
        
        i = i + 1;
    };
    all_loops.push(looplist);
    return pass ? {'some':all_loops, 'pass':true} : {'some':all_loops, 'pass':false}
}

function Displaydata({array}){
    console.log("dawdawdawdsssssssssss", array)
    return(
        <div className="">
        {(array[0][0]).map((keyy) => (
                    <div>
                    <div class="w-32 h-24 bg-blue-500 text-white p-4 rounded-md shadow-md">
                <div class="text-lg font-bold">Box: {keyy}</div>
                <div class="mt-2"> Slip: {array[1][keyy]}</div>
                </div>
                <div>
                -----
                            </div>
                        <br></br>
                    </div>
                ))}
        </div>
    );
}

function Modaal({keyl}){
    console.log("modemd", keyl[0])
    let [keyy, setkeyy] = useState(keyl)
    console.log("loawdoj", keyy)
    return(
        <>
        <>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Prisoner: {keyy[0][0]}
                </th>
                <td class="px-6 py-4">
                    Yes
                </td>
                <td class="px-6 py-4">
                <button class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max" type="button" onClick={()=>document.getElementById(`mod-${keyy[0][0]}`).showModal()}>
                <span class="relative text-base font-semibold text-white"
                        >Show path taken by Prisoner {keyy[0][0]}</span
                      >
                </button>
                </td>
            </tr>
                <div></div>
                
                
                <dialog id={`mod-${keyy[0][0]}`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
                    <div class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                        <div class="w-full">
                        <div class="m-8 my-20 max-w-[400px] mx-auto">
                            <div class="mb-8">
                            <h1 class="mb-4 text-3xl font-extrabold">Prisoner {keyy[0][0]}</h1> 
                            <Displaydata array={[keyy[0][1], keyy[1]]} />
                            </div>
                            <div class="space-y-4">
                            <button class="p-3 w-full relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                <span class="relative text-base font-semibold text-white"
                        >Close</span
                      >
                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                    </form>
                </div>
                </dialog> 
                </>
        </>
    )
}
// function getRandom2DArray(obj) {
//     // Convert the object values into an array of 2D arrays
//     const arrays = Object.values(obj);
  
//     // Get a random index
//     const randomIndex = Math.floor(Math.random() * arrays.length);
  
//     // Use the random index to access a random 2D array
//     const random2DArray = arrays[randomIndex];
  
//     return random2DArray, randomIndex;
//   }