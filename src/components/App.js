import React from 'react'
import './Main.css'
import TakeInput from './TakeInput.js'
import ShowResult from './ShowResult'
import SideBar from './SideBar'
class App extends React.Component{
    render(){
        
        return <div className="main-div">
                    <div className="main-head">RATE CALCULATOR</div>
                    <div className="main-inner-div">
                        <div className="side-bar-outer">
                            <SideBar />
                        </div>
                        <div className="calculated-div">
                            <TakeInput />
                            <ShowResult  />
                        </div>
                    </div>
                </div>
    }
}

export default App;