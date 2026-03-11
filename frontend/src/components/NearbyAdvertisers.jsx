import {React,useState,useEffect} from 'react';
import AdvertiserTile from './AdvertiserTile'
import axios from 'axios';
import { getCookie } from '../utils/cookies';


function NearbyAdvertisers({courseId}) {
    const [advertisers,updateAdvertisers] = useState([])

    useEffect(() => {
        console.log(courseId)
        var access_token = getCookie('access_token')
        if (courseId) {

            axios.post("http://localhost:8000/api/courses/advertisers/",{
                "course": courseId
            },{
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then((response) => {
                console.log("RESPONSE HERE")
                console.log(response)
                updateAdvertisers(response.data.advertisers)
            })
        }
    },[courseId])

    return (
        <div id="courseTiles">
            <h1 className="bodySectionTitle">NEARBY ADVERTISERS</h1>
            {advertisers ? <div id="AdvertiserList">
                {advertisers.length > 0 ? advertisers.map((advertiser) => {
                    return <AdvertiserTile key={advertiser} advertiser={advertiser}/>
                }) : <h2 className="errorMessage">None Yet!</h2>}
            </div> : null}
        </div>
    );
}


export default NearbyAdvertisers;