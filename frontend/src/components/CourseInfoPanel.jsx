// Add this to your ManagerView.jsx or create a separate CourseInfoPanel.jsx

export default function CourseInfoPanel({ selectedCourse }) {
    if (!selectedCourse) {
        return (
            <div className="courseInfoPanel">
                <div className="noSelection">Select a course to view details</div>
            </div>
        );
    }

    return (
        <div className="courseInfoPanel">
            <div className="courseInfoHeader">
                <h3>Course Details</h3>
            </div>
            <div className="courseInfoGrid">
                <div className="courseInfoItem fullWidth">
                    <label>Course Name</label>
                    <span className="courseInfoValue">{selectedCourse.name}</span>
                </div>
                <div className="courseInfoItem">
                    <label>City</label>
                    <span className="courseInfoValue">{selectedCourse.city}</span>
                </div>
                <div className="courseInfoItem">
                    <label>State</label>
                    <span className="courseInfoValue">{selectedCourse.state}</span>
                </div>
                <div className="courseInfoItem">
                    <label>ZIP Code</label>
                    <span className="courseInfoValue">{selectedCourse.zip || 'N/A'}</span>
                </div>
                <div className="courseInfoItem">
                    <label>Timezone</label>
                    <span className="courseInfoValue">{selectedCourse.timezone}</span>
                </div>
                <div className="courseInfoItem">
                    <label>Ad Count</label>
                    <span className="courseInfoValue">{selectedCourse.ad_count || 0}</span>
                </div>
                <div className="courseInfoItem">
                    <label>Last Active</label>
                    <span className="courseInfoValue">
                        {selectedCourse.last_active_date ? 
                            new Date(selectedCourse.last_active_date).toLocaleDateString() : 
                            'N/A'
                        }
                    </span>
                </div>
            </div>
        </div>
    );
};