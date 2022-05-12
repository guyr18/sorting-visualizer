import React from 'react';

class SimpleButton extends React.Component
{

    constructor(props)
    {

        super(props);
        this.state = {bg: this.props.defaultColor};
        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleHoverLeave = this.handleHoverLeave.bind(this);

    }

    handleClick(e)
    {

        this.props.onClick(e);

    }

    handleHover(e)
    {

        if(this.props.hoverColor != undefined)
        {

            this.setState({bg: this.props.hoverColor});

        }
    }

    handleHoverLeave(e)
    {

        if(this.state.bg == this.props.hoverColor)
        {

            this.setState({bg: this.props.defaultColor});

        }
    }

    render()
    {

        let temp = {...this.props.style};
        temp.backgroundColor = this.state.bg;

        return (
            <div onClick={this.handleClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverLeave} style={temp}>
                <p style={this.props.textStyle}>{this.props.label}</p>
            </div>

        );
    }
}

export default SimpleButton;
