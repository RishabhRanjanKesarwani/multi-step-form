import Error from "../error";
import UserDetails from "../userDetails";

interface UserDetailsState {
    data: UserDetails;
    loading: boolean;
    error: Error;
}

export default UserDetailsState;