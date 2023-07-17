import type { RequestHandler } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OPENAI_KEY, OPENAI_ORG_ID } from '$env/static/private';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const config = new Configuration({ apiKey: OPENAI_KEY, organization: OPENAI_ORG_ID });
const openai = new OpenAIApi(config);

export const POST: RequestHandler = async ({ request }) => {
	console.log(request);
	const { messages } = await request.json();
	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		stream: true,
		messages
	});

	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream);
};
