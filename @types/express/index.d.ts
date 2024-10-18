import {User} from '../../src/types/users-types';

declare global{
    namespace Express{
        interface Request{
            currentUser:User | null;
        }
    }
}