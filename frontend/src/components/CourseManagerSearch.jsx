import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../utils/cookies';

const CourseManagerSearch = ({ onCourseSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchCourses = async (term) => {
        if (!term.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const access_token = getCookie("access_token");
            const response = await axios.get(`http://localhost:8000/api/courses/search/?q=${encodeURIComponent(term)}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            });
            console.log("RESPONSE")
            console.log(response.data)
            setSearchResults(response.data);
        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            searchCourses(searchTerm);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <div className="courseSearchContainer">
            <div className="searchHeader">
                <h4>Search Courses</h4>
                <input
                    type="text"
                    placeholder="Search by course name, city, state, or zip..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="courseSearchInput"
                />
            </div>
            <div className="searchResults">
                {isLoading ? (
                    <div className="searchMessage">Searching...</div>
                ) : searchTerm && searchResults.length === 0 ? (
                    <div className="searchMessage">No courses found</div>
                ) : searchTerm === '' ? (
                    <div className="searchMessage">Enter a search term to find courses</div>
                ) : (
                    searchResults.map((course, index) => (
                        <div
                            key={course.id || index}
                            className="searchResultItem"
                            onClick={() => onCourseSelect(course)}
                        >
                            <div className="searchResultName">{course.name}</div>
                            <div className="searchResultLocation">
                                {course.city}, {course.state}
                            </div>
                            <div className="searchResultTimezone">{course.timezone}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CourseManagerSearch;