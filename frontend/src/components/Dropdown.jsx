import React, { useState,useEffect,useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

function Dropdown({changeCourse,courses}) {
    const [label,setLabel] = useState("Select Course")
    const [searchTerm,setSearchTerm] = useState("")
    const [open,setOpen] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {
        setLabel("Select Course")
    }, [courses]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown",handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown",handleClickOutside)
    },[open])


    const filteredCourses = courses
    ? courses.filter(course => 
        course.course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

    return (
        <div id="dropdownMain" className={open ? "open" : ""} ref={dropdownRef}>
            <div id="dropdownLabel" onClick={() => setOpen(!open)}>
                <span>{label}</span>
                <div id="dropdownIcon" className={open ? "flipped" : ""}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
            </div>
            <div id="dropdownDisplay" ref={dropdownRef}>
                <input
                    id="searchBar"
                    type='text'
                    placeholder="Search courses..."
                    onChange={e => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <div id="dropdownCourses">
                    {filteredCourses.length > 0 ? filteredCourses.map(course => (
                        <div
                            key={course.id}
                            className='dropdownItem'
                            onClick={() => {
                                setOpen(false);
                                changeCourse(course.course);
                                setLabel(course.course.name);
                                setSearchTerm("");
                            }}
                        >
                            {course.course.name}
                        </div>
                    )) : (
                        <div className='dropdownItem' style={{ color: "#ccc" }}>
                            No Courses Found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default Dropdown;