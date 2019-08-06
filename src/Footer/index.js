import React, {Component} from 'react';

import github_logo from './assets/GitHub-Mark/PNG/GitHub-Mark-32px.png';
import './Footer.css';
 

class Footer extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <footer className="page-footer font-small mdb-color pt-4">
                <div className="row d-flex align-items-center">
                  <div className="col-lg-12">
                    <div className="text-center ">
                      <ul className="list-unstyled list-inline">
                        <li className="list-inline-item">
                          <a href='https://github.com/Jordan-M-Schultz'>
                            <img alt = 'github_logo' src = {github_logo}></img>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
              </div>

            </footer>
        );
    }

}

export default Footer;

