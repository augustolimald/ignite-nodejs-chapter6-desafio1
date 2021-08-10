import { document } from "src/utils/dynamodbClient";

export const handle = async (event, context) => {
	const { user_id } = event.pathParameters;

	const consulta = await document
		.scan({ 
			TableName: 'todos',
			FilterExpression: 'user_id = :user_id',
			ExpressionAttributeValues: {
				':user_id': user_id
			},
		}).promise();

	return {
		statusCode: 201,

		body: JSON.stringify({
			consulta
		}, null, 2),
		
		headers: {
			'Content-Type': 'application/json'
		}
	}
}