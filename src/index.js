import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar } from 'react-bootstrap';


// Each Box represents a cell
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
        const width = this.props.cols * 16;
        var rowsArr = [];
        var boxClass = "";
        for (var i = 0; i < this.props.rows; i++) {
            for (var j = 0; j < this.props.cols; j++) {
                let boxId = i + j;
                boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
// Adds Box to array forming the Grid
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

class Buttons extends React.Component {
    render() {
        return(
            <div className="center">
                <ButtonToolbar>
                    <button className="button" onClick={this.props.playButton}>
                        Play
                    </button>
                    <button className="button" onClick={this.props.pauseButton}>
                        Pause
                    </button>
                    <button className="button" onClick={this.props.clear}>
                        Clear
                    </button>
                </ButtonToolbar>
            </div>
        )
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

    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
            gridFull: gridCopy
        })

    }

// Function for randomly populating the Grid
    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i=0; i< this.rows; i++){
            for (let j=0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            gridFull: gridCopy
        });
    }

    playButton = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.play, this.speed);
    }

    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    slow = () => {
        this.speed = 1000;
        this.playButton();
    }

    clear = () => {
        var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    }

    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);

// Checks to see if the cell has a neighbor
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let count = 0;
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
                if (!g[i][j] && count === 3) g2[i][j] = true;
            }
        }
        this.setState({
            gridFull: g2,
            generation: this.state.generation + 1
        });
    }

// Populates Grid when first loaded
    componentDidMount() {
        this.seed();
        this.playButton();
    }

    render() {
        return (
            <div>
                <h1>The Game Of Life</h1>
                <Buttons 
                    playButton={this.playButton}
                />
                <Grid 
                gridFull={this.state.gridFull}
                rows={this.rows}
                cols={this.cols}
                selectBox={this.selectBox}
                />
                    <h2>Generations: {this.state.generation}</h2>
            </div>
        );
    }
}

function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}


ReactDOM.render(<Main />, document.getElementById('root'));
