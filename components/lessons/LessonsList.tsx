import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Lesson } from "@/data/lessons";
import LessonActions from "./LessonActions";
import Link from "next/link";

export interface LessonsListProps {
  lessons: Lesson[];
}

export default function LessonsList({ lessons }: LessonsListProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell component="th" scope="row">
                <Link href={`/challenges/${lesson.id}`}>{lesson.name}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/challenges/${lesson.id}`}>
                  {lesson.description}
                </Link>
              </TableCell>
              <TableCell align="right">
                <LessonActions lessonId={lesson.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
