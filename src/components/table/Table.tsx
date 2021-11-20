import React, {FC} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Character } from "../../types/types";
import classes from './Table.module.css'
  
  interface dataProps {
    data: Character[];
  }

  export const BasicTable: FC<dataProps>= ({data}) => {
    return (
      <div className={classes.table}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Eye color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow
                key={data.name}
              >
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell align="right">{data.gender}</TableCell>
                <TableCell align="right">{data.mass}</TableCell>
                <TableCell align="right">{data.eye_color}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  }