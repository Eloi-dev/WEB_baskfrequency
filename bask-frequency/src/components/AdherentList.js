import React from 'react';
import { connect } from 'react-redux';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const AdherentList = ({ adherents }) =>{
  if (adherents === undefined || adherents.all.length === 0) {
    return (
      <TableBody>
        <TableRow key={0}>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell align="center">Il n'y a pas d'adhérents.</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        </TableRow>
      </TableBody>
    )
  }
  return (
    <TableBody>
      {adherents.all.map(row => (
        <TableRow key={row.id}>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.lastname + ' ' + row.firstname}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell align="right">{row.donation}</TableCell>
        </TableRow>
      ))}
    </TableBody>
)}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(AdherentList);