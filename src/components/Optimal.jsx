import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
//// { roomcontext } from "./Simulator";


export default function Optimal({room}){
    const [res, setres] = useState({});
    const [live, setlive] = useState(false);
    const [show, setshow] = useState(false)
    useEffect(() => {
            let newres = allprisoners(room)
            console.log("weaweawe",newres)
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
        <div class="max-w-7xl px-6 md:px-12 xl:px-6">
        <div class="relative">
        <div aria-hidden="true" class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
            {!live && <h1 class="text-base text-lg font-semibold text-bold">They all died, Number {Object.keys(res).length} could'nt find his slip 😔</h1>}
            {live && <h1 class="text-base text-lg font-semibold text-bold">THEY ALL LIVE ‼️💖✨</h1>}
        </div>
<div class="my-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    
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
        if(res['pass'] == 'No'){
            console.log("all dead becasue mf failed number: ", i);
            data[i] = res;
            break;
        }
        // else{
        //     const leen = (res['some']).length;
        //     console.log(res['some'][leen-1]);
        //     res['some'].push( room[( res['some'][leen - 1] )] );
        //     console.log(res['some'], room[( res['some'][(leen - 1)] )]);
        // }
        data[i] = res;
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
    return pass ? {'some':all_loops, 'pass':'Yes'} : {'some':all_loops, 'pass':'No'}
}

function Displaydata({array}){
    //console.log("dawdawdawdsssssssssss", array)
    let first = array[0][0][0]
    //let last = array[1][first]
    let leng = (array[0][0]).length
    function tryww(keyy, idx, leng){
        let bool = (leng-1 == idx);
        //console.log("charu", leng, idx);
        if(!bool){
            return(
                <>
                <div>
                    <div class="max-w m-2 p-4 bg-white bg-gradient-to-br from-fuchsia-100 to-purple-100 rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
                <div class="text-lg font-bold text-base text-primary dark:text-white text-[]">Box: {keyy}</div>
                <div class="px text-base text-primary dark:text-white"> Slip: {array[1][keyy]}</div>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-35 2 96 15" id="down-arrow"><path fill="#6563ff" d="M12 15.121a.997.997 0 0 1-.707-.293L7.05 10.586a1 1 0 0 1 1.414-1.414L12 12.707l3.536-3.535a1 1 0 0 1 1.414 1.414l-4.243 4.242a.997.997 0 0 1-.707.293Z"></path></svg>
                            </div>
                        <br></br>
                    </div>
                </>
            )
        }
        else{
            if(array[1][keyy] == first){
                return(
                    <>
                    <div>
                    <div class="max-w m-2 p-4 bg-white bg-gradient-to-br from-fuchsia-100 to-purple-100 rounded-lg shadow-[0px_20px_20px_rgba(90,_238,_10,_0.6)]">
                <div class="text-lg font-bold text-base text-primary dark:text-white text-[]">Box: {keyy}</div>
                <div class="px text-base text-primary dark:text-white"> Slip: {array[1][keyy]}</div>
                </div>
                <div class="relative pt-6 mx-auto px-4">
                <h1 class="text-base text-lg font-semibold text-bold">Boxes Opened: {leng}</h1>
                
                            </div>
                        <br></br>
                    </div>
                    </>
                )
            }
            else{
            return(
                <>
                <div>
                    <div class="max-w m-2 p-4 bg-white bg-gradient-to-br from-fuchsia-100 to-purple-100 rounded-lg shadow-[0px_20px_20px_rgba(240,_46,_170,_0.6)]">
                <div class="text-lg font-bold text-base text-primary dark:text-white text-[]">Box: {keyy}</div>
                <div class="px text-base text-primary dark:text-white"> Slip: {array[1][keyy]}</div>
                </div>
                <div class="relative pt-6 mx-auto px-4">
                <h1 class="text-base text-lg font-semibold text-bold">Boxes Opened: {leng}</h1>
                
                            </div>
                        <br></br>
                    </div>
                </>
            )}
        }
    }
    return(
        <div className="">
        {(array[0][0]).map((keyy, index) => (  
            <>
            {tryww(keyy, index, leng)}
            </>
                ))}
        </div>
    );
}

function Modaal({keyl}){
    //console.log("modemd", keyl)
    let numm = keyl[0][0]
    let prisonerdata = keyl[0][1]['some']
    let pass = keyl[0][1]['pass']
    let roomdata = keyl[1]
    //console.log("loawdoj", numm, prisonerdata, pass, roomdata)
    return(
        <>
        <>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Prisoner: {numm}
                </th>
                <td class="px-6 py-4">
                    {pass}
                </td>
                <td class="px-6 py-4">
                <button class="relative flex h-11 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max" type="button" onClick={()=>document.getElementById(`mod-${numm}`).showModal()}>
                <span class="relative text-base font-semibold text-white"
                        >Show path taken by Prisoner {numm}</span
                      >
                </button>
                </td>
            </tr>
                <div></div> 
                
                
                <dialog id={`mod-${numm}`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
                    <div class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                        <div class="w-full">
                        <div class="m-8 my-20 max-w-[400px] mx-auto">
                            <div class="mb-8">
                            <h1 class="mb-4 text-3xl font-extrabold">Prisoner {numm}</h1> 
                            <Displaydata array={[prisonerdata, roomdata]} />
                            </div>
                            <div class="space-y-4">
                            <button class="p-3 mx-auto w-full relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
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