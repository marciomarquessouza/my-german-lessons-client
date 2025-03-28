import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Challenge } from "@/data/challenges";
import ChallengesActions from "./ChallengesActions";

export interface ChallengesListProps {
  challenges: Challenge[];
}

export default function ChallengesList({ challenges }: ChallengesListProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Tip</TableCell>
            <TableCell sx={{ maxWidth: 100 }}>Source Language</TableCell>
            <TableCell sx={{ maxWidth: 100 }}>Target Language</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {challenges.map((challenge) => (
            <TableRow key={challenge.id}>
              <TableCell component="th" scope="row">
                {challenge.question}
              </TableCell>
              <TableCell component="th" scope="row">
                {challenge.question.length}
              </TableCell>
              <TableCell>{challenge.answer}</TableCell>
              <TableCell>{challenge.answer.length}</TableCell>
              <TableCell sx={{ maxWidth: 300 }}>{challenge.tip}</TableCell>
              <TableCell>{challenge.sourceLanguage}</TableCell>
              <TableCell>{challenge.targetLanguage}</TableCell>
              <TableCell align="right">
                <ChallengesActions challengeId={challenge.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
