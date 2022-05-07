import React from 'react';

class AlgorithmItem extends React.Component
{

    constructor(props)
    {

        super(props);
        this.state = {bg: "#FFF", labelColor: "#1a73e8", selected: false};
        this.clickHandler = this.clickHandler.bind(this);
        this.hoverHandler = this.hoverHandler.bind(this);
        this.hoverOutHandler = this.hoverOutHandler.bind(this);
        this.unselect = this.unselect.bind(this);

    }

    unselect()
    {

        // If the state is selected, render it as unselected.
        if(this.state.selected)
        {

            this.setState({bg: "#FFF", labelColor: "#1a73e8", selected: false});

        }
    }

    clickHandler(e)
    {

        // Unselect all other AlgorithmItem instances.
        this.props.unselectAllCallback(this.props.label);

        // This instance was previously unselected, so render it as selected now.
        if(!this.state.selected)
        {

            this.setState({bg: "#1a73e8", labelColor: "#FFF", selected: true});

        }
    }

    hoverHandler(e)
    {

        // If this element is not currently selected, apply hover.
        if(!this.state.selected)
        {

        
            this.setState({bg: '#eaeaea'});

        }
        else
        {

            this.setState({bg: "#1a62e8"});

        }
    }

    hoverOutHandler(e)
    {

        // Apply original color when we lose the hover based on selected boolean from state object.
        if(this.state.selected)
        {

            this.setState({bg: "#1a73e8"});

        }
        else
        {

            this.setState({bg: "#FFF"});

        }
    }

    render()
    {

        const label = this.props.label != undefined ? this.props.label : "Undefined";
        let itemStyle = {

            width: '150px',
            height: '40px',
            position: 'relative',
            borderStyle: 'solid',
            borderColor: '#eaeaea',
            borderRadius: '24px',
            borderWidth: '1px',
            textAlign: 'center',
        
        };
        itemStyle.backgroundColor = this.state.bg;

        return (

            <div onClick={this.clickHandler} onMouseEnter={this.hoverHandler} onMouseLeave={this.hoverOutHandler} style={itemStyle}>
                <h3 style={{position: 'relative', color: this.state.labelColor, fontSize: '14px', fontFamily: "Roboto, sans-serif"}}>{label}</h3> 
            </div>

        );
    }
}

export default AlgorithmItem;