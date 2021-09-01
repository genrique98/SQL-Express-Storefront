import Client from '../database'

// test connection to database
export const connection = async (): Promise<void> => {
    let retries = 5;
    while (retries) {
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
