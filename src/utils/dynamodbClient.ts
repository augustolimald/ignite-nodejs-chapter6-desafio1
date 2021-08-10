import { DynamoDB }  from 'aws-sdk';

const options = {
	region: 'localhost',
	endpoint: 'http://localhost:4001'
};

const dynamodb = new DynamoDB()
export const document = new DynamoDB.DocumentClient(options);