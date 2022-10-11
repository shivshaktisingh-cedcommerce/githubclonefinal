import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Card, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';


const Githubuser = () => {
    var options1={
      method:"POST" ,
      headers:{Authorization:`Bearer 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`}

    }
    const mystate = useSelector((state)=>state.function1)
    const[repourl , setRepourl]=useState([])
    const[current , setCurrent]=useState({})
    const [selected, setSelected] = useState(0);
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
      );
      const tabs = [  
        {
          id: 'accepts-marketing-1',
          content: 'Repositiories' ,
          new:repourl ,
          panelID: 'accepts-marketing-content-1',
        },
      ];

      const fetch_function3=async()=>{
        let t = mystate.save.length>0?mystate.save[0].login:sessionStorage.getItem('selected')
        let url = `https://api.github.com/users/${t}`
        await fetch(url , {options1})
        .then((res)=>res.json())
        .then((res)=>{
            setCurrent(res)
        })

      }

      const fetch_function4=async()=>{
        let t = mystate.save.length>0?mystate.save[0].login:sessionStorage.getItem('selected')
        let url = `https://api.github.com/users/${t}/repos`
        await fetch(url , {options1})
        .then((res)=>res.json())
        .then((res)=>{
            let t1=[];
            res.map((d)=>{
              t1.push(<div className="click_div"><p className="name_p_class">{d.name}</p><p className="p_language">{"Language : " +d.language}</p><p className="link_p_class">{"Description : " +d.description}</p><p className="anchor_tag_p_class"><a href={d.html_url} target="blank"> Click </a></p></div>);
            })
            setRepourl(t1)
        })
      }
      useEffect(()=>{
        fetch_function3();
        fetch_function4(); 
      }, [])
      

    
  return (
    <div className="githubuser_page_main_div">
        <div className="navbar_main_div_class">
            <div className="first_div_navbar">
                <p><i className="fa-brands fa-github icon_class"></i></p>
                <input type="text" className="search_input"/>
                <p>Pullrequests</p>
                <p>Issues</p>
                <p>Marketplace</p>
                <p>Explore</p>
            </div>
            <div className="second_div_navbar"></div>
            <div className="third_div_navbar">
            <p><i className="fa-solid fa-bell"></i></p>
            <p><img src={current.avatar_url} alt="" className="img_icon"/></p>
            </div>
        </div>
        <div className="content_page">
            <div className="contentpage_first_div">
                <img src={current.avatar_url} alt="" className="content_image_class"/>
                <p>{"Name : " +current.name}</p>
                <p>{"User Name : "+current.login}</p>
                <p>{"Bio : " +current.bio}</p>
                <p>{"Followers : " +current.followers + " Followers"}</p>
                <p>{"Following : " +current.following + " Following"}</p>
                <p>{"Repositiories : " +current.public_repos + " Repositiories"}</p>
                <p>{"Address : " +current.location}</p>
                <p>{"Email : " + current.email}</p>
                <p>{"Blog : " + current.blog}</p>
                <p>{"Twitter : " + current.twitter_username}</p>
            </div>
            <div className="contentpage_second_div">
            <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                
                <div>{tabs[selected].new}</div>
                
                
      </Tabs>
    </Card>
                
            </div>
        </div>

    </div>
  )
}

export default Githubuser