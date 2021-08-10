import { v4 as uuidV4} from 'uuid';

import { document } from 'src/utils/dynamodbClient';

interface ICreateToDoItem {
	title: string;
	deadline: string;
}

export const handle = async (event) => {
	const { title, deadline } = JSON.parse(event.body) as ICreateToDoItem;
	const { user_id } = event.pathParameters; 

	const todo = {
		id: uuidV4(),
		user_id,
		title,
		deadline: new Date(deadline).getTime(),
		done: false,
	};

	await document.put({
		TableName: 'todos',
		Item: todo
	}).promise();

	return {
		statusCode: 201,

		body: JSON.stringify({
			todo
		}),
		
		headers: {
			'Content-Type': 'application/json'
		}
	}
}