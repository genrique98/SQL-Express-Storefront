import Client from '../database'
import { PoolClient } from 'pg'

// test connection to database
export const connection = (): void => {
    let retries = 5;
    while (retries) {
        async () => {
            try {
                await Client.connect();
            } catch (err) {
                console.log(err);
                retries -= 1;
                console.log(`retries left: ${retries}`);
                // wait 5 seconds
                await new Promise(res => setTimeout(res, 1000));
            }
        }
    }
}
