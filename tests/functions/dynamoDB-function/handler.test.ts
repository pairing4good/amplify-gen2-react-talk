import { vi } from 'vitest'
import { handler } from '../../../amplify/functions/dynamoDB-function/handler';
import { DynamoDBStreamEvent, DynamoDBRecord } from 'aws-lambda';

const { mockInfo } = vi.hoisted(() => {
  return { mockInfo: vi.fn() }
})

const mockLogger = vi.hoisted(() => {
  return { info: mockInfo, }
})

vi.mock('@aws-lambda-powertools/logger', () => ({
  Logger: vi.fn().mockImplementation(() => mockLogger),
}));



describe('DynamoDB Stream Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should log INSERT events', async () => {
    const event: DynamoDBStreamEvent = {
      Records: [
        {
          eventID: '1',
          eventName: 'INSERT',
          dynamodb: {
            NewImage: {
              Key: { S: 'value' },
            },
          },
        } as DynamoDBRecord,
      ],
    };

    const result = await handler(event);

    expect(mockInfo).toHaveBeenCalledTimes(4);
    expect(mockInfo).toHaveBeenCalledWith('Processing record: 1');
    expect(mockInfo).toHaveBeenCalledWith('Event Type: INSERT');
    expect(mockInfo).toHaveBeenCalledWith('New Image: {"Key":{"S":"value"}}');
    expect(mockInfo).toHaveBeenCalledWith('Successfully processed 1 records.');

    expect(result).toEqual({ batchItemFailures: [] });
  });

});
