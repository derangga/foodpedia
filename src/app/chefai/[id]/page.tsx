import { getHistoryChatGpt } from "@/actions/gpt";
import MessageBox from "@/components/ui/chefai/message-box";
import { SessionNotFound } from "@/models/error";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const messages = await getHistoryChatGpt(id);
  console.log(messages);
  if (messages instanceof SessionNotFound) {
    notFound();
  }
  return (
    <div className="flex flex-col max-w-3xl w-full mx-auto p-4">
      <MessageBox messages={messages} />
    </div>
  );
}
