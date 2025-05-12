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
  const getChallengeUrl = (trailId: string, lessonId: string) => {
    return `/lessons/${trailId}/challenges/${lessonId}`;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Door Title</TableCell>
            <TableCell align="center">Room</TableCell>
            <TableCell align="center">Floor</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell component="th" scope="row">
                <Link href={getChallengeUrl(lesson.trailId, lesson.id)}>
                  {lesson.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={getChallengeUrl(lesson.trailId, lesson.id)}>
                  {lesson.doorTitle}
                </Link>
              </TableCell>
              <TableCell align="center">{lesson.roomPosition}</TableCell>
              <TableCell align="center">{lesson.floorPosition}</TableCell>
              <TableCell align="center">
                <LessonActions lesson={lesson} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
