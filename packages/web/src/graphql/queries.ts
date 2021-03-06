import gql from "graphql-tag";

export const me = gql`
    query me {
        me {
            _id
            email
            password
            devices
        }
    }
`

export const users = gql`
    query users($size: Int!, $page: Int!) {
        users(size: $size, page: $page) {
            edges {
                name
                email
            }
            hasNextPage
        }
        me {
            name
        }
    }
`;

export const userDevices = gql`
    query userDevices($_id: String!) {
        userDevices(_id: $_id) {
            _id
            xid
            name
            dataSourceType
            owner
            latitude
            longitude
        }
    }
`;

export const devices = gql`
    query devices {
        devices {
            _id
            xid
            name
            dataSourceType
            latitude
            longitude
        }
    }
`;

export const device = gql`
    query device($_id: String!) {
        device(_id: $_id) {
            _id
            xid
            name
            dataSourceType
            latitude
            longitude
        }
    }
`;

export const sensores = gql`
    query sensores {
        sensores {
            _id
            xid
            pointValue
            date
            dataType
            dataSourceId
        }
    }
`;

export const sensor = gql`
    query sensor($_id: String!) {
        sensor(_id: $_id) {
            _id
            xid
            pointValue
            date
            dataType
            dataSourceId
        }
    }
`;

export const deviceSensors = gql`
    query deviceSensors($_id: String!) {
        deviceSensors(_id: $_id) {
            _id
            xid
            pointValue
            date
            dataType
            dataSourceId
        }
    }
`;

export const sensorAlarm = gql`
    query sensorAlarm($_id: String!) {
        sensorAlarm(_id: $_id) {
            _id
            aceitavel {
                min
                max
            }
            emergencial {
                min
                max
            }
            perigoso {
                min
                max
            }
            createdAt
            sensor
        }
    }
`;
