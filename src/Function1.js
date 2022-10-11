export const initialState={
    save:[]
      
}

const function1 =(state= initialState , action)=>{
  
    switch(action.type){
         case  'SAVEDATA':
         return {...state , save:action.payload}
         default:
            return state;
    }
}


export default function1
