import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }

    render() {
        return (
            <div
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}
            />
        );
    }
}

class Grid extends React.Component {
    render() {
        const width = this.props.cols * 14;
        var rowsArr = [];

        var boxClass = "";
        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 50; j++) {
                // console.log("this think is on")
                let boxId = i + j;
                boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
                rowsArr.push(
                    <Box 
                        boxClass={boxClass}
                        key={boxId}
                        boxId={boxId}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                        
                    />
                    
                );
            }
        }

        return(
            <div className="grid" style={{width: width}}>
                {rowsArr}
            </div>
        );
    }
}

class Main extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    render() {
        return (
            <div>
                <h1>The Game Of Life</h1>
                <Grid 
                gridFull={this.state.gridFull}
                rows={this.rows}
                cols={this.cos}
                selectBox={this.selextBox}
                />
                    <h2>Generations: {this.state.generation}</h2>
            </div>
        );
    }
}


ReactDOM.render(<Main />, document.getElementById('root'));
