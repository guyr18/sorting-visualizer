import React from 'react';

// Data imports
import { randomNumbers } from '../data/DataUtil';
import { deepCopy } from '../data/DataUtil';
import { sleep } from '../data/DataUtil';

// Sorting imports
import { SelectCorrectAlgorithm } from '../data/SortingMethods';

// rc-slider imports
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Component imports
import BarElement from './BarElement';
import SimpleButton from './SimpleButton';

class CoreVisualizer extends React.Component
{

    constructor(props)
    {

        super(props);
        this.state = {showSimulation: false, sortComplete: false};
        this.onInputSizeChange = this.onInputSizeChange.bind(this);
        this.inputFieldRef = undefined;
        this.inputFieldValue = undefined;
        this.onGenerateClickHandler = this.onGenerateClickHandler.bind(this);
        this.onNewDataClickHandler = this.onNewDataClickHandler.bind(this);
        this.onSortDataClickHandler = this.onSortDataClickHandler.bind(this);
        this.dataGenerated = false;
        this.curData = [];
        this.barRefs = {};

    }

    onInputSizeChange(e)
    {

        this.inputFieldRef.current.value = e;
        
    }

    onGenerateClickHandler(e)
    {

        console.log("Generate clicked");
        this.inputFieldValue = this.inputFieldRef != undefined ? this.inputFieldRef.current.value : 10;
        this.curData = [];
        this.setState({showSimulation: true});

    }

    onNewDataClickHandler(e)
    {


        console.log("New data clicked");
        this.curData = [];
        this.setState({showSimulation: true});

    }


    onSortDataClickHandler(e)
    {

        console.log("Sort data clicked");
        console.log(this.props.sortMethod);
        let originalData = deepCopy(this.curData);
        let [sortedData, steps] = SelectCorrectAlgorithm(this.props.sortMethod, this.curData);
        let timeout = Math.ceil(7500 / this.curData.length);
        console.log(steps);

        const run = async () => {

            for(let i = 0; i < steps.length; i++)
            {

                let step = steps[i];

                console.log(step);

                // If this step indicates a completed pass, mark the element as sorted and in the 
                // correct, sorted position.
                if(step.markStep != undefined)
                {

                    this.barRefs[originalData[step.index]].current.setState({itemLabel: originalData[step.index].toString(), bg: "#9370DB"});
                    await sleep(timeout);
                    continue;

                }

                 // If this step involved a swap, render it appropriately.
                if(step.swapped)
                {

                    // These elements were out of order. Temporarily render as red to indicate this.
                    this.barRefs[originalData[step.left]].current.setState({itemLabel: originalData[step.left].toString(), bg: "#EE5959"});
                    this.barRefs[originalData[step.right]].current.setState({itemLabel: originalData[step.right].toString(), bg: "#EE5959"});
                    await sleep(timeout);

                    // Swap the elements.
                    let temp = originalData[step.left];
                    let tempBar = this.barRefs[originalData[step.left]];
                    this.barRefs[originalData[step.left]] = this.barRefs[originalData[step.right]];
                    this.barRefs[originalData[step.right]] = tempBar;
                    originalData[step.left] = originalData[step.right];
                    originalData[step.right] = temp;
            
                    // Update text labels and reset to default color to show that they were swapped.
                    this.barRefs[originalData[step.left]].current.setState({bg: "#1ab4e8", itemLabel: originalData[step.left].toString()});
                    this.barRefs[originalData[step.right]].current.setState({bg: "#1ab4e8", itemLabel: originalData[step.right].toString()});

                }
                else
                {

                    // No swap was needed here. Render both BarElement(s) as green and move to the next step.
                    this.barRefs[originalData[step.left]].current.setState({itemLabel: originalData[step.left].toString(), bg: "#04DD6D"});
                    this.barRefs[originalData[step.right]].current.setState({itemLabel: originalData[step.right].toString(), bg: "#04DD6D"});
                    await sleep(timeout);
                    this.barRefs[originalData[step.left]].current.setState({itemLabel: originalData[step.left].toString(), bg: "#1ab4e8"});
                    this.barRefs[originalData[step.right]].current.setState({itemLabel: originalData[step.right].toString(), bg: "#1ab4e8"});

                }
            }

            window.alert("Clearing visualization in 5 seconds..");
            await sleep(5000);
            this.setState({showSimulation: false});

        }

        run();

    }

    render()
    {

        let sortMethodParts = this.props.sortMethod.split(" ");
        let sortMethod = (sortMethodParts[0] + sortMethodParts[1]).toLowerCase().trim();

        const gatherInfo = () => {

            return (
                <React.Fragment>
                    <div style={quickCenterStyle}>
                        <p style={getStartedStyle}>Select an input size and click the button below to get started!</p>
                        <Slider style={inputSizeStyle} handleStyle={{width: '20px', height: '20px'}} trackStyle={{height: '10px'}} railStyle={{height: '10px'}} onChange={this.onInputSizeChange} min={5} max={50} />
                        <input ref={this.inputFieldRef} style={inputSizeTrackStyle} value={5} placeholder={5} type="text" readOnly />
                        <SimpleButton defaultColor="#1a73e8" hoverColor="#1a62e8" onClick={this.onGenerateClickHandler} style={generateButtonStyle} textStyle={generateButtonLabelStyle} label="Generate" />
                    </div>
                    <div style={quickCenterStyle}>
                        <div style={complexityBoxStyle}>
                            <p style={complexityTextStyle}>Worst Case: {complexities.quadratic[sortMethod].worst}</p>
                            <p style={complexityTextStyle}>Average Case: {complexities.quadratic[sortMethod].average}</p>
                            <p style={complexityTextStyle}>Best Case: {complexities.quadratic[sortMethod].best}</p>
                            <p style={complexityTextStyle}>Space Complexity: {complexities.quadratic[sortMethod].space}</p>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        const simView = () => {


            if(!this.dataGenerated || this.curData.length == 0)
            {

                this.curData = randomNumbers(this.inputFieldValue, 50);
                this.dataGenerated = true;

            } else { return; }

            const visualizerFrameWidth = window.innerWidth * .6; // CSS sets width as 60%; we need 60% of the screen width to know the visualizer frame width.
            const elemWidth = visualizerFrameWidth / this.curData.length; // Width can vary as a function of the input size.
            let jsxFromCurData = [];
            let tempRefs = [];

            for(let obj in this.barRefs)
            {

                tempRefs.push(this.barRefs[obj]);

            }

            this.barRefs = {};

            // Build BarElement references and JSX elements for simulation view display.
            for(let i = 0; i < this.curData.length; i++)
            {


                let item = this.curData[i];
                let elemHeight = item <= 1 ? ((item + 1) * 10) + 10 : item * 10;
                let jsxBarRef = tempRefs.length > 0  && i < this.curData.length ? tempRefs[i] : React.createRef();                
                let jsxFullElem = (<li key={i.toString()} style={{paddingLeft: '10px'}}>
                                    <BarElement ref={jsxBarRef} label={item} itemCount={this.curData.length} width={(elemWidth.toString()) + "px"} height={(elemHeight.toString()) + "px"} />
                                   </li>);

                jsxFromCurData.push(jsxFullElem);
                this.barRefs[item] = jsxBarRef;
                
            }

            return (

                <React.Fragment>
                    <div style={quickCenterStyle}>
                        <h3 style={{position: 'absolute', top: 0, paddingTop: '105px', fontSize: '32px', fontFamily: 'Roboto, sans-serif', cursor: 'pointer'}}>{this.props.sortMethod}</h3>
                        <SimpleButton defaultColor="#1a73e8" hoverColor="#1a62e8" onClick={this.onNewDataClickHandler} style={newDataButtonStyle} textStyle={newDataButtonLabelStyle} label="Get New Data" />
                        <SimpleButton defaultColor={this.state.sortComplete ? "#EE4B2B" : "#1a73e8"} hoverColor={this.state.sortComplete ? "#EE4D2D" : "#1a62e8"} onClick={this.state.sortComplete ? null : this.onSortDataClickHandler} style={sortDataButtonStyle} textStyle={sortDataButtonLabelStyle} label="Sort Data" />
                        <ul style={{display: 'flex', position: 'relative', cursor:'pointer', paddingTop: '150px', listStyle: 'none'}}>
                            {jsxFromCurData}
                        </ul>
                    </div>
                </React.Fragment>
            );
        };

        this.inputFieldRef = this.inputFieldRef == undefined ? React.createRef() : this.inputFieldRef;

        return (
            <React.Fragment>
                <div style={quickCenterStyle}>
                    {!this.state.showSimulation && <h3 style={{position: 'absolute', paddingTop: '175px', fontSize: '32px', fontFamily: 'Roboto, sans-serif', cursor: 'pointer'}}>{this.props.sortMethod}</h3>}
                    {!this.state.showSimulation && gatherInfo()}
                    {this.state.showSimulation && simView()}
                </div>
            </React.Fragment>
        );
    }
}

// DATA OBJECTS
var complexities = {

    quadratic: {

        mergesort: {

            worst: "O(NLogN)",
            average: "O(NLogN)",
            best: "O(NLogN)",
            space: "O(N)",

        },

        quicksort: {

            worst: "O(N^2)",
            average: "O(NLogN)",
            best: "O(NLogN)",
            space: "O(1)",

        },

        bubblesort: {

            worst: "O(N^2)",
            average: "O(N^2)",
            best: "O(N)",
            space: "O(1)",

        },

        insertionsort: {

            worst: "O(N^2)",
            average: "O(N^2)",
            best: "O(N)",
            space: "O(1)",

        },

        selectionsort: {

            worst: "O(N^2)",
            average: "O(N^2)",
            best: "O(N^2)",
            space: "O(1)",

        }
    }
};

// STYLES

const complexityTextStyle = {

    position: 'relative',
    paddingLeft: '45px',
    fontWeight: 'bold',
    cursor: 'pointer',

};

const quickCenterStyle = {

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

};

const complexityBoxStyle = {

    width: '80%',
    height: '120px',
    borderRadius: '12px',
    borderWidth: '1px',
    borderColor: '#eaeaea',
    borderStyle: 'solid',
    position: 'absolute',
    top: '70%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

};

const inputSizeTrackStyle = {

    width: '75px',
    height: '20px',
    position: 'absolute',
    top: '400px',
    color: "#555",
    textAlign: 'center',

};

const inputSizeStyle = {


    width: '400px',
    position: 'absolute',
    top: '340px',

};

const getStartedStyle = {

    color: "#232323",
    fontSize: '14px',
    fontFamily: "Roboto, sans-serif",
    position: 'absolute',
    top: '250px',
    cursor: 'pointer',

};

const generateButtonStyle = {

    position: 'absolute',
    backgroundColor: "#1a73e8",
    width: '140px',
    height: '40px',
    cursor: 'pointer',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: "#eaeaea",
    borderRadius: '32px',
    top: '52%',
};

const generateButtonLabelStyle = {

    position: 'relative',
    bottom: '3px',
    color: "#FFF",
    fontFamily: "Roboto, sans-serif",
    cursor: 'pointer',

};

const newDataButtonStyle = {

    position: 'absolute',
    backgroundColor: "#1a73e8",
    width: '140px',
    height: '40px',
    cursor: 'pointer',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: "#eaeaea",
    borderRadius: '32px',
    top: '22%',
    marginRight: '200px',
    zIndex: 1,

};

const newDataButtonLabelStyle = {

    position: 'relative',
    bottom: '3px',
    color: "#FFF",
    fontFamily: "Roboto, sans-serif",
    cursor: 'pointer',

};

const sortDataButtonStyle = {

    position: 'absolute',
    backgroundColor: "#1a73e8",
    width: '140px',
    height: '40px',
    cursor: 'pointer',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: "#eaeaea",
    borderRadius: '32px',
    top: '22%',
    marginLeft: '200px',
    zIndex: 1,

};

const sortDataButtonLabelStyle = {

    position: 'relative',
    bottom: '3px',
    color: "#FFF",
    fontFamily: "Roboto, sans-serif",
    cursor: 'pointer',

};

export default CoreVisualizer;