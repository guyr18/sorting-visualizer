import React from 'react';

// Icon imports
import { GiCardExchange } from 'react-icons/gi';

class FooterPanel extends React.Component
{

    constructor(props)
    {

        super(props);

    }

    render()
    {

        return (

            <div style={footerContainerStyle}>
                <div style={quickCenterStyle}>
                    <ul style={leftListingStyle}>
                        <li key="linked-in" style={{position: 'absolute', right: 150}}><a target="_blank" style={linkStyle} href="https://www.linkedin.com/in/guyr18/">LinkedIn</a></li>
                        <li key="git-hub" style={{position: 'absolute', right: 68}}><a target="_blank" style={linkStyle} href="https://github.com/guyr18">GitHub</a></li>
                    </ul>
                    <p style={{...linkStyle, position: 'absolute', textAlign: 'center', paddingTop: '25px', paddingLeft: '315px'}}>Developed by Robert Guy</p>
                    <a href="#"><GiCardExchange color={"#1a73e8"} style={{paddingTop: '25px'}} size={30} /></a>
                </div>
            </div>
        )
    }
}

const linkStyle = {

    fontSize: '12px',
    fontFamily: "Roboto, sans-serif",
    textDecoration: 'none',
    zIndex: -999,

};

const leftListingStyle = {

    listStyle: 'none',
    display: 'flex',
    position: 'relative',
    cursor: 'pointer',

};

const footerContainerStyle = {

    width: '100%',
    height: '80px',
    borderTopColor: "#eaeaea",
    borderStyle: 'solid',
    borderBottomColor: "#1a73e8",
    borderBottomWidth: '8px',
    borderTopWidth: '1px',
    position: 'absolute',
    bottom: 0,

};

const quickCenterStyle = {

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

};


export default FooterPanel;