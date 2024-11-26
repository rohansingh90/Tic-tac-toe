import React, { useEffect, useState } from "react";

const App = () => {
  const [matrix, setmatrix] = useState(Array(9).fill(null));
const [isturn,setisturn] = useState(true)
const [won,setwon] = useState(null);
const [draw,setdraw] = useState(false);

const handlclick = (e)=>{
const pos = e.target.id

if(matrix[pos] || won) return;
const copymatrix = [...matrix]
copymatrix[pos] = isturn? "x" : "o"
setmatrix(copymatrix)
setisturn(!isturn)
}

const caluclatewinner = ()=>{
  const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if(matrix[a] && matrix[a] === matrix[b]&& matrix[a] === matrix[c]){
      setwon(matrix[a])
      setisturn(true)
    }
  }
}
useEffect(()=>{
caluclatewinner()
},[matrix])

if(!matrix.includes(null) && !won){
  setdraw(true)
}

const restegame = ()=>{
  setmatrix(Array(9).fill(null))
  setisturn(true)
  setwon(false)
  setdraw(false)
}
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="m-20 text-3xl font-semibold">Tic Tac To</h1>

      <div onClick={handlclick} className="grid grid-cols-3 ">
        {matrix.map((item, index) => {
          return (
            <div key={index} id={index} className="w-20 h-20 border bg-gray-300 outline flex justify-center items-center text-3xl font-semibold">
              
              {item}
            </div>
          );
        })}
      </div>

      <div>
      <div className="text-center text-3xl mt-4">
          {won ? `${won} has won the game!`: draw ? "It's a draw!" : `${isturn ? "X" : "O"}'s turn`}
        </div>


        <button onClick={restegame} className=" w-24 m-4 p-2 rounded bg-red-500 hover:bg-red-700">
          reset
        </button>
      </div>
    </div>
  );
};

export default App;
