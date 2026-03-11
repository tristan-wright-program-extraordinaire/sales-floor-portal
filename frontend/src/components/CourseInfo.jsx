import { React,useEffect,useState } from 'react';
import LocationTile from './LocationTile';
import axios from 'axios';

function CourseInfo({mainCourse}) {
    const [advertisers,setAdvertisers] = useState([])
    useEffect(() => {
        console.log(mainCourse)
        if (mainCourse) {
            axios.post("http://localhost:8000/api/courses/advertisers/",{
                "course": mainCourse.course_id
            }).then((response) => {
                console.log("RESPONSE HERE")
                console.log(response)
            })
        }
    },[mainCourse])
    return (
        <div id="courseInfoMain">
            <h1 className="bodySectionTitle">COURSE INFO</h1>
            <div id="courseInfoLayout">
                <div id="courseInfo">
                    <div className="courseInfoTile">
                        <div className="courseInfoTileTitle">RECENT DEAL</div>
                        <div className="courseInfoTileValue">
                            {mainCourse && mainCourse.advertisers.length > 0 ? mainCourse.last_deal_date : null}
                        </div>
                    </div>
                    <div className="courseInfoTile">
                        <div className="courseInfoTileTitle">POPULATION</div>
                        <div className="courseInfoTileValue">
                            {mainCourse ? mainCourse.population : null}
                        </div>
                    </div>
                </div>
                {mainCourse ? <LocationTile mainCourse={mainCourse}/> : null}
            </div>
        </div>
    );
}


export default CourseInfo;