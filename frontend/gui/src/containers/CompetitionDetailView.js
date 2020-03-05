import React from 'react';
import axios from 'axios';

import { Card } from 'antd';

class CompetitionDetail extends React.Component {

    state = {
        competition: {}
    };

    componentDidMount() {
        const competitionID = this.props.match.params.competitionID;
        axios.get(`http://127.0.0.1:8000/api/competitions/${competitionID}`)
            .then(res => {
                this.setState({
                    competition: res.data
                });
    });
}


    render() {
        return (
            <Card title={this.state.competition.name}>
                <p>
                    {this.state.competition.description}
                </p>
            </Card>
        )
    }
}

export default CompetitionDetail;