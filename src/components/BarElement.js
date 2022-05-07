import React from 'react';

class BarElement extends React.Component
{

    constructor(props)
    {

        super(props);
        this.DEFAULT_COLOR = "#1ab4e8";
        this.state = {bg: this.DEFAULT_COLOR, width: this.props.width, height: this.props.height, itemLabel: ""};

    }

    componentDidMount()
    {

        this.setState({itemLabel: this.props.label});

    }

    componentDidUpdate(prevProps)
    {

        if(this.props.label != prevProps.label)
        {

            this.setState({bg: this.DEFAULT_COLOR, width: this.props.width, height: this.props.height, itemLabel: this.props.label});

        }
    }

    render()
    {

        let getFontSize = ((this.props.width / 2).toString()) + "px"; // Font size is a function of the width.

        return (

            <div style={{position: 'relative', width: this.props.width, height: this.props.height, backgroundColor: this.state.bg}}>
                {this.props.itemCount < 30 && <p style={{color: "#FFF", fontWeight: "bold", fontSize: getFontSize}}>{this.state.itemLabel}</p>}
            </div>
        );
    }
}

export default BarElement;
