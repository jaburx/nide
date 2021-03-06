import React from "react";
import { Query } from "react-apollo";

import { Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { userDevices } from "../../../graphql/queries";

interface DispositivoProps {
    _id: any;
    classes?: any;
    history?: any;
    theme?: Theme;
    style?: React.CSSProperties;
}

const DispositivoTable: React.FC<DispositivoProps> = ({ history, _id }: any) => {
    const onDispositivoClick = (_id: any) => {
        history.push({ pathname: `/dispositivos/${_id}` });
    };

    return (
        <Query query={userDevices} variables={{ _id }}>
            {({ loading, error, data }) => {
                if (loading) return "";
                if (error) return `Error! ${error.message}`;

                return (
                    <Paper
                        style={{
                            width: "100%",
                            height: "100%",
                            gridRow: "2 / 3",
                            boxShadow: "0",
                            borderRadius: "0"
                        }}
                    >
                        <div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                textAlign: "start",
                                                fontFamily: "Montserrat",
                                                fontSize: "0.9rem",
                                                color: "#999999"
                                            }}
                                        >
                                            Nome do Dispositivo
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "start",
                                                fontFamily: "Montserrat",
                                                fontSize: "0.9rem",
                                                color: "#999999"
                                            }}
                                        >
                                            Latitude
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "start",
                                                fontFamily: "Montserrat",
                                                fontSize: "0.9rem",
                                                color: "#999999"
                                            }}
                                        >
                                            Longitude
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "start",
                                                fontFamily: "Montserrat",
                                                fontSize: "0.9rem",
                                                color: "#999999"
                                            }}
                                        >
                                            Quantidade de Sensores
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.userDevices.map(
                                        ({
                                            _id,
                                            name,
                                            latitude,
                                            longitude
                                        }: any) => (
                                                <TableRow
                                                    style={{
                                                        cursor:
                                                            "pointer"
                                                    }}
                                                    key={_id}
                                                    onClick={() =>
                                                        onDispositivoClick(
                                                            _id
                                                        )
                                                    }
                                                >
                                                    <TableCell
                                                        style={{
                                                            textAlign:
                                                                "start",
                                                            fontSize:
                                                                "0.9rem",
                                                            fontWeight: 500,
                                                            color:
                                                                "black"
                                                        }}
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {name}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign:
                                                                "start",
                                                            fontSize:
                                                                "0.9rem",
                                                            fontWeight: 500,
                                                            color:
                                                                "black"
                                                        }}
                                                    >
                                                        {latitude}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign:
                                                                "start",
                                                            fontSize:
                                                                "0.9rem",
                                                            fontWeight: 500,
                                                            color:
                                                                "black"
                                                        }}
                                                    >
                                                        {longitude}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign:
                                                                "start",
                                                            fontSize:
                                                                "0.9rem",
                                                            fontWeight: 500,
                                                            color:
                                                                "black"
                                                        }}
                                                    >
                                                        {
                                                            data.userDevices.length
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                );
            }}
        </Query>
    );
};

export default DispositivoTable;
