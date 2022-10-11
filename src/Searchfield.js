import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo, useEffect} from 'react';
import {Card} from '@shopify/polaris'
import {Button} from '@shopify/polaris';
import { savedata } from './Reduceraction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AutocompleteExample() {
  var options1={
    method:"GET" ,
    headers:{Authorization:`Bearer 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`}

  }
    const[rows , setRows] = useState([])
    const[currentdata , setCurrentData]=useState([])
    const deselectedOptions = useMemo(
    () => rows,
    [rows],
  );
  const dispatch = useDispatch();
  const navi = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState(['mojombo']);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected) => {
        console.log(selected)
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0]);
    },
    [options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );
  const fetch_function=async()=>{
    await fetch('https://api.github.com/users' ,{options1})
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
        let t = []
    res.map((d)=>{
        t.push({value:d.login , label:d.login})
    })
    setRows([...t])
  })
  }

  const fetch_function2=async()=>{
    await fetch(`https://api.github.com/users/${selectedOptions}` ,{options1})
    .then((res)=>res.json())
    .then((res)=>{
    
        setCurrentData([res])

      
    })
  }

  const handler=(d)=>{
    console.log(d)
    dispatch(savedata([d]))
    navi('/githubuser')
  }
  useEffect(()=>{
    fetch_function();

     },[])

     useEffect(()=>{
       fetch_function2();
     },[selectedOptions])

  return (
  
    <div className="searchfield_page_main_div">
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
      <div className="card_div_class"></div>
      {currentdata?currentdata.map((d)=>{
        return(
          <Card sectioned key={d}>
           <div className="main_card_div">
             <div className="main_card_div1">
             <img src={d.avatar_url+".jpg"} alt="Girl in a jacket" className="img_class"/>
             </div>
             <div className="main_card_div2">
             <p className="p1_class">{d.name}</p>
             <p className="p2_class"><span>{d.followers + " Followers"}</span><span>{d.following + " Following"}</span><span>{d.public_repos + " repositiories"}</span></p>
             <p className="p3_class"><Button primary onClick={()=>handler(d)}>Show Profile</Button></p>
             </div>
           </div>      
          </Card>
           )
      }):""
      }
    </div>
  );
}