import {React} from 'react';

function AdvertiserTile({ advertiser }) {
    return (
        <div className="advertiserTileBounds">
            <div className="advertiserTile">
                <div className="advertiserName">{advertiser}</div>
            </div>
        </div>
    );
}


export default AdvertiserTile;