import Flow from "@/components/editor/Flow";

export default function EditorPage({ params }: { params: { id: string } }) {
	return <Flow id={params.id} />;
}
