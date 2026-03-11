import { useRef,useState,useEffect } from 'react'
import axios from 'axios';
import Dropdown from './Dropdown';
import InfoTile from './InfoTile';
import NearbyAdvertisers from './NearbyAdvertisers';
import HoleLayout from './HoleLayout';
import { getCookie } from '../utils/cookies';

export default function AdminView({ rep,logout }) {
    const [courses,updateCourses] = useState([])
    const [mainCourse,changeCourse] = useState(null)
    const [debugMode,enableDebugMode] = useState(false)

    useEffect(() => {
        get_course_assignments()
    },[rep])

    const get_course_assignments = () => {
        var access_token = getCookie("access_token")
        var headers = {
            "Authorization": `Bearer ${access_token}`
        }
        axios.get(`http://localhost:8000/api/reps/rep/${rep.id}/active-assignments/`, { withCredentials: true, headers: headers }).then(response => {
            console.log(response)
            updateCourses(response.data)
        })
    }
    if (mainCourse) {
        console.log(mainCourse.course_id)
    }

    return (
        <div id="App">
            <div id="header">
                <Dropdown changeCourse={changeCourse} courses={courses}/>
                <InfoTile rep={rep}/>
                <button className='button' onClick={logout}>Logout</button>
            </div>
            <div id="body">
                <div className="bodySection greenBorder">
                    {mainCourse ? <NearbyAdvertisers courseId={mainCourse.course_id}/> : null}
                </div>
                <div id="rightSide">
                    <div id="shortContainers">
                        <div id="advertiserPanel" className="greenBorder">
                        </div>
                        <div id="holeLayoutPanel" className="greenBorder">
                            {mainCourse ? <HoleLayout debugMode={debugMode} mainCourse={mainCourse}/> : null}
                        </div>
                    </div>
                    <div id="mapPanel" className="greenBorder">
                        {mainCourse ? <iframe title="Course Map" src={"*****PROPRIETARY INFO*****"}></iframe> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
