import React from 'react';

// Component imports
import TopPanel from './TopPanel';
import CoreVisualizer from './CoreVisualizer';
import FooterPanel from './FooterPanel';

class AppWrapper extends React.Component
{

    constructor(props)
    {

        super(props);
        this.state = {showCoreVisualizer: false, sortMethod: ""};
        this.rerenderCallback = this.rerenderCallback.bind(this);
        this.visualizerRef = React.createRef();
        this.firstClick = true;

    }

    rerenderCallback(data)
    {

        this.setState({showCoreVisualizer: data.showCoreVisualizer, sortMethod: data.sortMethod});

        if(this.firstClick)
        {

            this.firstClick = false;
            return;

        }

        this.visualizerRef.current.setState({showSimulation: false});

    }

    render()
    {

        return (
            <React.Fragment>
                <TopPanel parentCallback={this.rerenderCallback} />
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {this.state.showCoreVisualizer && <CoreVisualizer ref={this.visualizerRef} sortMethod={this.state.sortMethod} />}
                    {!this.state.showCoreVisualizer && <h3 style={{fontSize: '32px', fontFamily: 'Roboto, sans-serif'}}>No algorithm currently selected!</h3>}
                </div>
                <FooterPanel />
            </React.Fragment>
        );
    }
}

export default AppWrapper;