import {
  Award,
  FileExclamationPoint,
  Lightbulb,
  SpellCheck2,
  TableOfContents,
} from "lucide-react-native";
import cssInteropIcon from "../utils/cssInteropIcon";

cssInteropIcon(Award);
cssInteropIcon(Lightbulb);
cssInteropIcon(TableOfContents);
cssInteropIcon(SpellCheck2);
cssInteropIcon(FileExclamationPoint);

const reactionIcons = {
  "Clear and Natural": <Award className="text-green-600" size={22} />,
  "Good Ideas": <Lightbulb className="text-yellow-600" size={22} />,
  "Well Structured": <TableOfContents className="text-blue-600" size={22} />,
  "Language needs Work": <SpellCheck2 className="text-amber-600" size={22} />,
  "Hard to Follow": <FileExclamationPoint className="text-red-600" size={22} />,
} as const;

export default reactionIcons;
