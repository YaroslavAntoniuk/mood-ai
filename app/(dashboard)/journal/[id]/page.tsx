import { Params } from "@/utils/types";

const JournalEntryPage = ({ params }: Params) => {
  return (
    <div>
      <div>Journal Entry Page</div>
      <div>{params.id}</div>
    </div>
  );
}

export default JournalEntryPage;
