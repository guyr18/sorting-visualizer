import React from 'react';

// Component imports
import AlgorithmItem from './AlgorithmItem';
import SimpleButton from './SimpleButton';

class TopPanel extends React.Component
{

    constructor(props)
    {

        super(props);
        this.visualizerShowing = false;
        this.sortSelected = undefined;
        this.itemRefs = [];
        this.unselectAll = this.unselectAll.bind(this);

    }

    // UnselectAll(labelToIgnore) unselects all AlgorithmItem objects except the one
    // with a label of labelToIgnore.
    unselectAll(labelToIgnore)
    {

        // Iterate through item references.
        for(let i = 0; i < this.itemRefs.length; i++)
        {

            // If this is not the label we wish to ignore, i.e.: the new item we are going to select
            // unselect it.
            if(this.itemRefs[i].current.props.label != labelToIgnore)
            {

                // Call unselect method.
                this.itemRefs[i].current.unselect();

            }
        }

        this.visualizerShowing = true;
        this.sortSelected = labelToIgnore;
        this.props.parentCallback({showCoreVisualizer: true, sortMethod: labelToIgnore});

    }

    render()
    {

        // If item references were not constructed in a previous render, render
        // them now; i.e.: this is first render.
        if(this.itemRefs.length == 0)
        {

            for(let i = 0; i < 3; i++)
            {

                this.itemRefs.push(React.createRef());

            }
        }

        return (

            <div style={panelContainer}>
                <ul style={{width: '95%', position: 'relative', display: 'flex', cursor: 'pointer', listStyle: 'none', marginTop: '25px', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <li><AlgorithmItem key="Insertion Sort" unselectAllCallback={this.unselectAll} ref={this.itemRefs[0]} style={{zIndex: 1}} label="Insertion Sort" /></li>
                    <li><AlgorithmItem key="Selection Sort" unselectAllCallback={this.unselectAll} ref={this.itemRefs[1]} style={{zIndex: 1}} label="Selection Sort" /></li>
                    <li><AlgorithmItem key="Bubble Sort" unselectAllCallback={this.unselectAll} ref={this.itemRefs[2]} style={{zIndex: 1}} label="Bubble Sort" /></li>
                </ul>
            </div>

        );
    }
}

const panelContainer = {


    width: '100%',
    height: '100px',
    borderStyle: 'solid',
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '1px',
    borderBottomColor: '#eaeaea',

};


export default TopPanel;
