import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Node = ({ node }) => (
    <div className="node">
        <Card>
            <CardHeader
              title={node.label}
              subtitle={node._id}
            />
            <CardText>
                {node.content}
            </CardText>
            <CardActions>
                <FlatButton label="Branch" />
                <FlatButton label="Vote" />
            </CardActions>
        </Card>
    </div>
);

Node.propTypes = {
    node: React.PropTypes.object,
};

export default Node;
