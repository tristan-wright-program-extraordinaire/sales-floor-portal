import { React,useState,useEffect } from 'react';

function HoleLayout({mainCourse,debugMode}) {
    const [holes,updateHoles] = useState()
    const [status,updateStatus] = useState(true)

    useEffect(() => {
        var courseName = mainCourse.name.split(" - ")[0].toString()
        updateHoles(false)
        if (!debugMode) {
            fetch("*****PROPRIETARY INFO*****")
                .then((response) => {
                    if (!response.ok) {
                        updateStatus(false)
                        throw new Error(response.status)
                    } else {
                        return response.json()
                    }
                })
                .then((data) => {
                    console.log(data)
                    updateHoles(data)
                    updateStatus(true)
                })
                .catch(error => console.error(error));
        } else {
            updateHoles({"1": 1,"10": 0,"11": 0,"12": 0,"13": 0,"14": 0,"15": 0,"16": 0,"17": 1,"18": 0,"2": 2,"3": 2,"4": 1,"5": 1,"6": 1,"7": 2,"8": 1,"9": 1,"scorecard": 14})
            updateStatus(true)
        }
    },[mainCourse])

    return (
        <div id="holeLayout">
            <h1 className="bodySectionTitle">ADS PER HOLE</h1>
            {status ? <div id="holes">
                { holes ? <div id="scorecard">
                    <div className="holeLabel">SCORE CARD</div>
                    <div className="holeAdCount">{holes['scorecard']}</div>
                </div> : null }
                { holes ? <div id="holeOverview">
                    <div className="holeLabel">HOLES AVAILABLE</div>
                    <div id="holeOverviews">
                        <div className="holesRow">
                            <div className={"holeOverviewLabel" + (holes['1'] > 0 ? " filled" : "")}>1</div>
                            <div className={"holeOverviewLabel" + (holes['2'] > 0 ? " filled" : "")}>2</div>
                            <div className={"holeOverviewLabel" + (holes['3'] > 0 ? " filled" : "")}>3</div>
                            <div className={"holeOverviewLabel" + (holes['4'] > 0 ? " filled" : "")}>4</div>
                            <div className={"holeOverviewLabel" + (holes['5'] > 0 ? " filled" : "")}>5</div>
                            <div className={"holeOverviewLabel" + (holes['6'] > 0 ? " filled" : "")}>6</div>
                            <div className={"holeOverviewLabel" + (holes['7'] > 0 ? " filled" : "")}>7</div>
                            <div className={"holeOverviewLabel" + (holes['8'] > 0 ? " filled" : "")}>8</div>
                            <div className={"holeOverviewLabel" + (holes['9'] > 0 ? " filled" : "")}>9</div>
                        </div>
                        <div className="holesRow">
                            <div className={"holeOverviewLabel" + (holes['10'] > 0 ? " filled" : "")}>10</div>
                            <div className={"holeOverviewLabel" + (holes['11'] > 0 ? " filled" : "")}>11</div>
                            <div className={"holeOverviewLabel" + (holes['12'] > 0 ? " filled" : "")}>12</div>
                            <div className={"holeOverviewLabel" + (holes['13'] > 0 ? " filled" : "")}>13</div>
                            <div className={"holeOverviewLabel" + (holes['14'] > 0 ? " filled" : "")}>14</div>
                            <div className={"holeOverviewLabel" + (holes['15'] > 0 ? " filled" : "")}>15</div>
                            <div className={"holeOverviewLabel" + (holes['16'] > 0 ? " filled" : "")}>16</div>
                            <div className={"holeOverviewLabel" + (holes['17'] > 0 ? " filled" : "")}>17</div>
                            <div className={"holeOverviewLabel" + (holes['18'] > 0 ? " filled" : "")}>18</div>
                        </div>
                    </div>
                </div> : <h2 className="errorMessage">Currently Unavailable</h2>  }
            </div> : null}
        </div>
    );
}


export default HoleLayout;