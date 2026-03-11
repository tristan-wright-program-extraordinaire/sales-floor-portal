import { React,useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'

function LocationTile({mainCourse}) {
    const [location,updateLocation] = useState("Pick A Course")

    useEffect(() => {
        updateLocation(mainCourse.name)
    },[mainCourse])

    return (
        <div id="locationTile">
            <div id="locationIcon">
                <FontAwesomeIcon icon={faMapLocation}/>
            </div>
            <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(location)} id='locationDisplay' className='greenBorder' >{location}</a>
        </div>
    );
}


export default LocationTile;