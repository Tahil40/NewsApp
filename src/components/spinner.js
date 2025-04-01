import React, {Component} from "react";
import loading from './loading.gif.gif';

export class Spinner extends Component{
    render(){
        return(
            <>
            <div className="image_container text-center">
                <img src={loading} alt="Loading..." />
            </div>
            </>
        );
    }
}