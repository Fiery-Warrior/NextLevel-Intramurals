import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

// Generate Order Data
function createData(id, date, name, sport, email, phone) {
    return { id, date, name, sport, email, phone };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'John Doe',
        'Hockey',
        'johndoe@example.com',
        '555-555-5555',
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Jane Doe',
        'Quidditch',
        'janedoe@example.com',
        '555-555-5555',
    ),
    createData(
        2,
        '16 Mar, 2019',
        'Bob Smith',
        'Hockey',
        'bobsmith@example.com',
        '555-555-5555',
    ),
    createData(
        3,
        '16 Mar, 2019',
        'Samantha Johnson',
        'Quidditch',
        'samanthajohnson@example.com',
        '555-555-5555',
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Mike Williams',
        'Hockey',
        'mikewilliams@example.com',
        '555-555-5555',
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Users() {
    return (
        <React.Fragment>
            <Card>
                <CardHeader title="User" />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Sport</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.sport}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                    See more Users
                </Link>
            </Card>
        </React.Fragment>
    );
}