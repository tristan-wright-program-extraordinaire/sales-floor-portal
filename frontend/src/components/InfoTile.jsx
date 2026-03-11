import {React} from 'react';

function InfoTile({rep}) {

    console.log(rep)

    return (
        <div id="infoTile">
            <div id="userInfo"> 
                <div className="userInfoTile">
                    <div className="userInfoTileTitle">USER</div>
                    <div className="userInfoTileValue">{rep ? rep.name.split(" ")[0].toString() : null}</div>
                </div>
                <div className="userInfoTile">
                    <div className="userInfoTileTitle">EXTENSION</div>
                    <div className="userInfoTileValue">{rep ? rep.extension.number : null}</div>
                </div>
            </div>
        </div>
    );
}



export default InfoTile;