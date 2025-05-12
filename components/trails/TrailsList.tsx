import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Trail } from "@/data/trails";
import TrailActions from "./TrailActions";

export interface TrailsListProps {
  trails: Trail[];
}

export default function TrailList({ trails }: TrailsListProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Rooms</TableCell>
            <TableCell>Floors</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trails.map((trail) => (
            <TableRow key={trail.id}>
              <TableCell component="th" scope="row">
                <Link href={`/lessons/${trail.id}`}>{trail.name}</Link>
              </TableCell>
              <TableCell component="th" scope="row">
                <Link href={`/lessons/${trail.id}`}>{trail.title}</Link>
              </TableCell>
              <TableCell component="th" scope="row">
                {trail.rooms}
              </TableCell>
              <TableCell component="th" scope="row">
                {trail.floors}
              </TableCell>
              <TableCell align="center">
                <TrailActions trail={trail} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
