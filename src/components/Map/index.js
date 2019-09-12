import React from 'react'

class Map extends React.PureComponent{

    render(){
        const display = this.props.address.display_address;
        var addr = "";
        if(display){
            for(let i = 0 ; i < display.length ; i++)
                addr += ` ${display[i]}`;
        }

        console.log(addr);
        return(
            <iframe
                width="665"
                height="320"
                frameBorder="0" style={{border:"0"}}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCk8ykqX2DGde_mQ38CILX0YJBjw2apvO4&q=${addr}}`}
                allowFullScreen>
            </iframe>
        );
    }
}

export default Map;