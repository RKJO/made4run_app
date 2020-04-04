import React from 'react';
import axios from 'axios';
import Competitions from '../components/Competition';

class CompetitionList extends React.Component {

    state = {
        competitions: []
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/competitions')
            .then(res => {
                this.setState({
                    competitions: res.data
                });
    });
}


    render() {
        return (
            <Competitions data={this.state.competitions} />
        )
    }
}

export default CompetitionList;