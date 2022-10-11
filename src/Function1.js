export const initialState={
    save:[] ,
    sel:['mojombo']
      
}

const function1 =(state= initialState , action)=>{
  
    switch(action.type){
         case  'SAVEDATA':
         return {...state , save:action.payload}
         case  'SAVESELECT':
         return {...state , sel:action.payload}
         default:
            return state;
    }
}


export default function1
