import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Card, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';


const Githubuser = () => {
    const nav = useNavigate()
    const mystate = useSelector((state)=>state.function1)
    const[repourl , setRepourl]=useState([])
    const [selected, setSelected] = useState(0);
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
      );
      const tabs = [
        {
          id: 'all-customers-1',
          content: 'Overview',
          accessibilityLabel: 'All customers',
          panelID: 'all-customers-content-1',
          name:"Name : " +mystate.save[0].name ,
          login:"User Name : "+mystate.save[0].login ,
          bio:"Bio : " +mystate.save[0].bio ,
          followers:"Followers : " +mystate.save[0].followers + " Followers" ,
          following:"Following : " +mystate.save[0].following + " Following" ,
          repositories: "Repositiories : " +mystate.save[0].public_repos + " Repositiories" ,
          location:"Address : " +mystate.save[0].location ,
          email:"Email : " + mystate.save[0].email ,
          blog:"Blog : " + mystate.save[0].blog ,
          twitter: "Twitter : " + mystate.save[0].twitter_username

        },
        {
          id: 'accepts-marketing-1',
          content: 'Repositiories' ,
          new:repourl ,
          panelID: 'accepts-marketing-content-1',
        },
      ];

      const fetch_function3=async()=>{
        await fetch(`https://api.github.com/users/${mystate.save[0].login}/repos` , {headers:{Authorization:`Bearer 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`}})
        .then((res)=>res.json())
        .then((res)=>{
            let t=[];
            console.log(res)
            res.map((d)=>{
              t.push(<div className="click_div"><p className="name_p_class">{d.name}</p><p>{"Language : " +d.language}</p><p className="link_p_class">{d.description}</p><p className="anchor_tag_p_class"><a href={d.html_url} target="blank"> Click </a></p></div>);
            //   console.log(t)
            })
            setRepourl(t)
        })
      }
      useEffect(()=>{
        fetch_function3(); 
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
            <p><img src={mystate.save[0].avatar_url} alt="" className="img_icon"/></p>
            </div>
        </div>
        <div className="content_page">
            <div className="contentpage_first_div">
                <img src={mystate.save[0].avatar_url} alt="" className="content_image_class"/>
            </div>
            <div className="contentpage_second_div">
            <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <p>{tabs[selected].name}</p>
                <p>{tabs[selected].login}</p>
                <p>{tabs[selected].bio}</p>
                <p>{tabs[selected].followers}</p>
                <p>{tabs[selected].following}</p>
                <p>{tabs[selected].repositories}</p>
                <p>{tabs[selected].location}</p>
                <p>{tabs[selected].email}</p>
                <p>{tabs[selected].blog}</p>
                <p>{tabs[selected].twitter}</p>
                <div>{tabs[selected].new}</div>
                
                
      </Tabs>
    </Card>
                
            </div>
        </div>

    </div>
  )
}

export default Githubuser