import { useRef,useState,useEffect } from 'react'
import axios from 'axios';
import InfoTile from './InfoTile';
import CourseInfoPanel from './CourseInfoPanel';
import CourseManagerSearch from './CourseManagerSearch';
import { getCookie } from '../utils/cookies';

export default function ManagerView({ rep,logout }) {
    const [reps,setReps] = useState([])
    const [mainCourse,changeCourse] = useState(null)
    const [debugMode,enableDebugMode] = useState(false)
    const [activeRep,setActiveRep] = useState(null)
    const [courses,setCourses] = useState([])

    useEffect(() => {
        get_rep_assignments()
    },[rep])

    useEffect(() => {
        console.log(activeRep)
        if (activeRep) {
            get_course_assignments()
        }
    },[activeRep])

    const get_course_assignments = () => {
        var access_token = getCookie("access_token")
        var headers = {
            "Authorization": `Bearer ${access_token}`
        }
        axios.get(`http://localhost:8000/api/reps/rep/${activeRep.id}/active-assignments/`, { withCredentials: true, headers: headers }).then(response => {
            console.log(response.data)
            setCourses(response.data)
        })
    }

    const get_rep_assignments = () => {
        var access_token = getCookie("access_token")
        var headers = {
            "Authorization": `Bearer ${access_token}`
        }
        axios.get(`http://localhost:8000/api/reps/manager/${rep.id}/active-assignments/`, { withCredentials: true, headers: headers }).then(response => {
            setReps(response.data)
        })
    }
    if (mainCourse) {
        console.log(mainCourse.course_id)
    }

    return (
        <div id="ManagerView">
            <div id="header">
                <InfoTile rep={rep}/>
                <button className='button' onClick={logout}>Logout</button>
            </div>
            <div id="body">
                <div className="repSelector">
                    {reps.length > 0 ? reps.map((rep, index) => (
                        <div style={{width:"100%"}} key={rep.id || index}>
                            <button className={activeRep === rep ? "repButton active" : "repButton"} rep={rep} onClick={() => setActiveRep(rep)}>
                                <div className="repInfo">
                                    <div className="repName">{rep.name}</div>
                                    {rep.extension && (
                                        <div className="repDetails">{rep.extension.number}</div>
                                    )}
                                </div>
                            </button>
                        </div>
                    )) : (
                        <div className="errorMessage">No reps assigned</div>
                    )}
                </div>
                <div className="courseSelector">
                    <div className="courseInfoDisplay">
                        <CourseInfoPanel selectedCourse={mainCourse}/>
                    </div>
                    <div className="courseSearch">
                        <CourseManagerSearch onCourseSelect={changeCourse} />
                    </div>
                </div>
                <div className="repCourseDisplay">
                    {activeRep && courses ? <>
                        <div className="timezoneCourses">
                            <div className="timezoneTitle">Pacific</div>
                            {courses.filter(course => course.course.timezone === "Pacific").map((course,index) => (
                                <div onClick={() => changeCourse(course.course)} key={course.id || index} className="assignedCourse">
                                    <div className="courseName">{course.course.name}</div>
                                    <div className="courseCity">{course.course.city}, {course.course.state}</div>
                                </div>
                            ))}
                        </div>
                        <div className="timezoneCourses">
                            <div className="timezoneTitle">Central</div>
                            {courses.filter(course => course.course.timezone === "Central").map((course,index) => (
                                <div key={course.id || index} className="assignedCourse">
                                    <div className="courseName">{course.course.name}</div>
                                    <div className="courseCity">{course.course.city}, {course.course.state}</div>
                                </div>
                            ))}
                        </div>
                        <div className="timezoneCourses">
                            <div className="timezoneTitle">Eastern</div>
                            {courses.filter(course => course.course.timezone === "Eastern").map((course,index) => (
                                <div key={course.id || index} className="assignedCourse">
                                    <div className="courseName">{course.course.name}</div>
                                    <div className="courseCity">{course.course.city}, {course.course.state}</div>
                                </div>
                            ))}
                        </div>
                    </> : null}
                </div>
            </div>
        </div>
    )
}
